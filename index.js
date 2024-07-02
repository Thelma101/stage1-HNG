const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const ipstackAccessKey = '7d065c730b8326a1b41caa942cf628fa';
const meteoWeatherAPI = 'https://api.open-meteo.com/v1/forecast?';

app.get('/api/hello', async (req, res) => {
    const personName = req.query.personName;

    if (!personName) {
        return res.status(400).json({
            message: 'Please enter your name in the URL'
        });
    }

    try {
        // Get client's IP address from request headers
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (!clientIp) {
            return res.status(400).json({
                message: 'Could not determine client IP address'
            });
        }

        // Fetch location data using Axios
        const ipstackApiUrl = `http://api.ipstack.com/${clientIp}?access_key=${ipstackAccessKey}`;
        const locationResponse = await axios.get(ipstackApiUrl);
        const { city, latitude, longitude } = locationResponse.data;

        if (!latitude || !longitude) {
            throw new Error('Location data not available');
        }

        // Fetch temperature data using latitude and longitude
        const weatherResponse = await axios.get(`${meteoWeatherAPI}&latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`);
        const currentTemperature = weatherResponse.data.current.temperature_2m;

        const greeting = `Hello ${personName}!, the temperature is ${currentTemperature}°C in ${city}`;

        res.json({
            ip: clientIp,
            city,
            greeting,
        });

        console.log(clientIp);
        console.log(city);
        console.log(greeting);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error Fetching Data'
        });
    }
});

app.listen(port, () => {
    console.log(`Hurray, server is running on http://localhost:${port}`);
});
