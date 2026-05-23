const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// Theme assets
app.use(express.static(path.join(__dirname, 'src/theme/public/')));
app.use(express.static(path.join(__dirname, 'src/theme/assets')));
app.use(morgan('tiny'));

// Static index page
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'src/theme/index.html'));
});

app.listen(3000, () => console.log('Evie app listening on port 3000')); // Initialize the express server