// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log('Server started');
    console.log(`Listening on port ${port}`);
});

// Server functions
function sendData (request, response) {
    response.send(projectData);
}

function addProjectData(request, response) {
    projectData = request.body;
    console.log(projectData);
    return projectData;
}

// GET routes
app.get('/all', sendData);

// POST routes
app.post('/set', addProjectData);