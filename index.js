const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const ipstackAccessKey = '7d065c730b8326a1b41caa942cf628fa';
const ipstackApiUrl = `http://api.ipstack.com/check?access_key=${ipstackAccessKey}`;
const meteoWeatherAPI = 'https://api.open-meteo.com/v1/forecast?';

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name;

    if (!visitorName) {
        return res.status(400).json({
            message: 'Please enter your name in the URL'
        });
    }

    try {
        // Fetch location data using Axios
        const locationResponse = await axios.get(ipstackApiUrl);
        const { ip, city, latitude, longitude } = locationResponse.data;

        // Fetch temperature data using latitude and longitude
        const weatherResponse = await axios.get(`${meteoWeatherAPI}&latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`);
        const currentTemperature = weatherResponse.data.current.temperature_2m;

        const greeting = `Hello ${visitorName}!, the temperature is ${currentTemperature}°C in ${city}`;

        res.json({
            ip,
            city,
            greeting,
        });

        console.log(ip);
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
