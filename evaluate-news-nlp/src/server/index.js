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

function analyzeText(req, resp) {
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

    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(response => ({
            status: response.status,
            body: response.json()
        }))
        .then(({ status, body }) => {
            console.log('success', status, body)
            resp.send({message: body});
        })
        .catch(error => {
            console.log('error', error)
            resp.send({message: 'Error occurred whilst request'})
        });
}

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/analyze', analyzeText);

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

