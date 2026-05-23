const express = require('express');
const app = express();
const path = require('path');

// Theme assets
app.use(express.static(path.join(__dirname, 'src/theme')));

// Static index page
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'src/theme/index.html'));
});

app.listen(3000, () => console.log('Evie app listening on port 3000')); // Initialize the express server