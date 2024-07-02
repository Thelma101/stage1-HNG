const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const ipstackAccessKey = '7d065c730b8326a1b41caa942cf628fa';
const ipstackApiUrl = `http://api.ipstack.com/check?access_key=${ipstackAccessKey}`;
const meteoWeatherAPI = 'https://api.open-meteo.com/v1/forecast?';

app.get('/api/hello', async (req, res) => {
    const personName = req.query.personName || 'Tee';

    try {
        // Fetch location data using Axios
        const locationResponse = await axios.get(ipstackApiUrl);
        const { ip, city } = locationResponse.data;

        // if (!latitude || !longitude) {
        //     throw new Error('Location data not available');
        // }

        //         {
        //   "client_ip": "127.0.0.1", // The IP address of the requester
        //   "location": "New York" // The city of the requester
        //   "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
        // }

        const weatherResponse = await axios.get(`${meteoWeatherAPI}&latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`);
        const currentTemperature = weatherResponse.data.current.temperature_2m;

        const greeting = `Hello ${personName}!, the temperature is ${currentTemperature}°C in ${city}`;

        res.json({
            ip,
            city,
            greeting,
        });

        console.log(ip);
        console.log(location);
        console.log(greeting);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error Fetching Data'
        });
    }
});

app.listen(port, () => {
    console.log(`Hurray, server is connected on http://localhost:${port}`);
});
