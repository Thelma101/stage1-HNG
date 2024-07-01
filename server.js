const express = require('express');
const app = express();
const port = 3001;

app.get('/api/hello?',  (req, res) => {

})

const url = 'https://api.ipstack.com/check?access_key={PASTE_YOUR_API_KEY_HERE}';
const options = {
	method: 'GET'
};

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