// // https://stage1-hng.vercel.app/api/hello?personName=Tee?

// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 3001;

// const ipstackAccessKey = '7d065c730b8326a1b41caa942cf628fa';
// const ipstackApiUrl = `http://api.ipstack.com/check?access_key=${ipstackAccessKey}`;
// const meteoWeatherAPI = 'https://api.open-meteo.com/v1/forecast?';

// app.get('/api/hello', async (req, res) => {
//     const personName = req.query.personName;

//     if (!personName) {
//         return res.status(400).json({
//             message: 'Please enter your name in the URL'
//         });
//     }

//     try {
//         // Fetch location data using Axios
//         const locationResponse = await axios.get(ipstackApiUrl);
//         const { ip, city, latitude, longitude } = locationResponse.data;

//         // Fetch temperature data using latitude and longitude
//         const weatherResponse = await axios.get(`${meteoWeatherAPI}&latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`);
//         // const weatherResponse = await axios.get(`${meteoWeatherAPI}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`);
//         const currentTemperature = weatherResponse.data.current.temperature_2m;

//         const greeting = `Hello ${personName}!, the temperature is ${currentTemperature}°C in ${city}`;

//         res.json({
//             ip,
//             city,
//             greeting,
//         });

//         console.log(ip);
//         console.log(city);
//         console.log(greeting);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Error Fetching Data'
//         });
//     }
// });

// app.listen(port, () => {
//     console.log(`Hurray, server is running on http://localhost:${port}`);
// });

// // SECOND IP FIX

// const express = require('express');
// const axios = require('axios');
// const { IPinfoWrapper } = require('node-ipinfo');
// const app = express();
// const port = 3001;

// const ipinfoToken = 'cb0526a54b8e6e'; // Replace with your ipinfo.io token
// const ipinfo = new IPinfoWrapper(ipinfoToken);
// const meteoWeatherAPI = 'https://api.open-meteo.com/v1/forecast?';

// // Function to get external IP address
// async function getExternalIp() {
//     const response = await axios.get('https://api.ipify.org?format=json');
//     return response.data.ip;
// }

// app.get('/api/hello', async (req, res) => {
//     const visitorName = req.query.visitor_name;

//     if (!visitorName) {
//         return res.status(400).json({
//             message: 'Please enter your name in the URL'
//         });
//     }

//     try {
//         // Get client's IP address from request headers
//         let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//         // Check if running locally and adjust IP
//         if (clientIp === '::1' || clientIp === '127.0.0.1') {
//             clientIp = await getExternalIp();
//         }

//         // Fetch location data using ipinfo.io
//         const locationResponse = await ipinfo.lookupIp(clientIp);

//         console.log('Location Response:', locationResponse); // Log the entire response to see its structure

//         // Check if locationResponse contains expected fields
//         if (!locationResponse.city || !locationResponse.loc) {
//             throw new Error('Location data not available');
//         }

//         const { city, loc } = locationResponse;

//         // Extract latitude and longitude from loc
//         const [latitude, longitude] = loc.split(',');

//         // Fetch temperature data using latitude and longitude
//         const weatherResponse = await axios.get(`${meteoWeatherAPI}&latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`);
//         const currentTemperature = weatherResponse.data.current.temperature_2m;

//         const greeting = `Hello ${visitorName}!, the temperature is ${currentTemperature}°C in ${city}`;

//         res.json({
//             ip: clientIp,
//             city,
//             greeting,
//         });

//         console.log(clientIp);
//         console.log(city);
//         console.log(greeting);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Error Fetching Data'
//         });
//     }
// });

// app.listen(port, () => {
//     console.log(`Hurray, server is running on http://localhost:${port}`);
// });
