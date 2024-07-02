const express = require('express');
const app = express();
const port = 3001;

const ipstackAccessKey = '7d065c730b8326a1b41caa942cf628fa';

app.get('/api/hello', async (req, res) => {
    const personName = req.query.personName || 'Tee';

    try {
        // Fetch location data
        const locationUrl = await fetch(`https://api.ipstack.com/check?access_key=${ipstackAccessKey}`);
        const locationData = await locationUrl.json();

        const { ip, country_name, city, latitude: lat, longitude: lon } = locationData;

        const message = `Hello ${personName} from ${country_name}`;
        
        res.json({
            message,
            ip,
            city,
            lat,
            lon
        });

        // Fetch temperature data
        const temperatureUrl = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const temperatureData = await temperatureUrl.json();

        const { temperature, windspeed, winddirection, weathercode, time } = temperatureData.current_weather;

        console.log(`${message} - It's ${temperature}°C, ${windspeed} m/s from ${winddirection} at ${time}`);
        
        console.log(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error Fetching Data'
        });
    }
});

app.listen(port, () => {
    console.log(`Hurray, server is connected on ${port}`);
});
