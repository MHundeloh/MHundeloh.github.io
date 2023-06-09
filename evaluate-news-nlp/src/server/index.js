const dotenv = require('dotenv');
dotenv.config();

const apikey = process.env.API_KEY;

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()
// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());


app.use(express.static('dist'))

console.log(__dirname)

/* asynchronous function for calling text analysis api */
async function analyzeText(req, resp) {
    try {
        const text = req.body;
        const formdata = new FormData();
        formdata.append("key", apikey);
        formdata.append("txt", text.formText);
        formdata.append("lang", "en");  // 2-letter code, like en es fr ...

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
        const result = await response.json();

        resp.send(result);
    } catch (error) {
        console.error("Error:", error);
        resp.send(error);
    }
}

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

/* GET request route for homepage */
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

/* POST request route for analysis */
app.post('/analyze', analyzeText);

/* GET request route for test */
app.get('/test', function (req, res) {
    console.log("called /test");
    res.send(mockAPIResponse)
})

