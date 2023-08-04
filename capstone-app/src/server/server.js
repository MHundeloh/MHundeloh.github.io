// Setup empty JS object to act as endpoint for all routes
let projectData = {};
require('dotenv').config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log('Server started');
    console.log(`Listening on port ${port}`);
    console.log(JSON.stringify(projectData));
});

// Server functions
/* sending project data to the frontend */
function sendData (request, response) {
    response.send(projectData);
}

/* add given data to project data */
function addProjectData(request, response) {
    const data = request.body;
    projectData = {
        date : data.date,
        days : data.days,
        city : data.myCity,
        lon : data.lon,
        lat : data.lat,
        country : data.country,
        imageUrl: data.imageUrl,
        weather : data.weather
    }
    console.log("addProjectData: "+ JSON.stringify(projectData));
    response.send(projectData);
}

// GET routes
app.get('/all', sendData);
app.get('/apikey/geonames', (request, response) => {
    response.send({'apikey': process.env.GEO_API_KEY});
})

app.get('/apikey/wheatherbit', (request, response) => {
    response.send({'apikey': process.env.WEATHER_API_KEY});
})

app.get('/apikey/pixabay', (request, response) => {
    response.send({'apikey': process.env.PIXA_API_KEY});
})

// POST routes
app.post('/set', addProjectData);