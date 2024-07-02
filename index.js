const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

// Replace with your actual API keys
const ipstackAccessKey = '7d065c730b8326a1b41caa942cf628fa';
// const weatherbitAPIKey = 'YOUR_WEATHERBIT_API_KEY';

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Tee';

    try {
        // Fetch location data based on client's IP address
        const locationUrl = `http://api.ipstack.com/check?access_key=${ipstackAccessKey}`;
        const locationResponse = await fetch(locationUrl);
        const locationData = await locationResponse.json();

        const clientIP = locationData.ip || req.ip;
        const location = locationData.city || 'London';
        const lat = locationData.latitude;
        const lon = locationData.longitude;

        // Fetch weather data based on location
        // const tempUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherbitAPIKey}`;
        // const tempResponse = await fetch(tempUrl);
        // const tempData = await tempResponse.json();

        // const temperature = tempData.data[0].temp;

        // Prepare the response
        const response = {
            client_ip: clientIP,
            location: location,
            // greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
            greeting: `Hello, ${visitorName}!,degrees Celsius in ${location}`
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is connected on ${port}`);
});
