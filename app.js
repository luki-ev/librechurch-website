const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// Convert assets location based on what type of gulp task we are running
app.locals.asset = function(assetLocation, assetTheme){ return assetLocation; }
app.set('view engine', 'ejs'); // Set template engine to ejs

// Theme pages
app.set('views', [path.join(__dirname, 'src/theme/')]);
app.use(express.static(path.join(__dirname, 'src/theme/public/')));
app.use(express.static(path.join(__dirname, 'src/theme/assets')));
app.use(morgan('tiny'));

// Theme pages
app.get('/', (req,res) => res.render('index')); // Landing page

app.listen(3000, () => console.log('Evie app listening on port 3000')); // Initialize the express server