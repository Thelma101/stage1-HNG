const express = require('express');
const app = express();
const port = 3001;

app.get('/api/hello?',  (req, res) => {

})

const locationUrl = 'https://api.ipstack.com/check?access_key={7d065c730b8326a1b41caa942cf628fa}';
const options = {
	method: 'GET'
};

const tempUrl = 'https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely';

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

app.listen(port, () => {
    console.log(`Server is connected on ${port}`);
})