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

app.get('/mockup/weather', (request, response) => {
    response.send({"city_name":"New York City","country_code":"US","data":[{"app_max_temp":27.9,"app_min_temp":22.3,"clouds":34,"clouds_hi":46,"clouds_low":17,"clouds_mid":14,"datetime":"2023-08-05","dewpt":18.1,"high_temp":28,"low_temp":21.7,"max_dhi":null,"max_temp":28,"min_temp":21.4,"moon_phase":0.690836,"moon_phase_lunation":0.65,"moonrise_ts":1691287976,"moonset_ts":1691250222,"ozone":325.2,"pop":0,"precip":0,"pres":1013.4,"rh":68,"slp":1013.4,"snow":0,"snow_depth":0,"sunrise_ts":1691229393,"sunset_ts":1691280413,"temp":24.7,"ts":1691208060,"uv":8.5,"valid_date":"2023-08-05","vis":21.443,"weather":{"code":802,"icon":"c02d","description":"Scattered clouds"},"wind_cdir":"SE","wind_cdir_full":"southeast","wind_dir":143,"wind_gust_spd":4.5,"wind_spd":3},{"app_max_temp":26.6,"app_min_temp":22.1,"clouds":55,"clouds_hi":86,"clouds_low":19,"clouds_mid":46,"datetime":"2023-08-06","dewpt":16.5,"high_temp":26.9,"low_temp":23.1,"max_dhi":null,"max_temp":26.9,"min_temp":21.7,"moon_phase":0.578644,"moon_phase_lunation":0.68,"moonrise_ts":1691375833,"moonset_ts":1691340900,"ozone":296.5,"pop":30,"precip":1.2986679,"pres":1015.6,"rh":60,"slp":1015.6,"snow":0,"snow_depth":0,"sunrise_ts":1691315851,"sunset_ts":1691366742,"temp":24.8,"ts":1691294460,"uv":7.7,"valid_date":"2023-08-06","vis":31,"weather":{"code":803,"icon":"c03d","description":"Broken clouds"},"wind_cdir":"E","wind_cdir_full":"east","wind_dir":98,"wind_gust_spd":4.5,"wind_spd":3.3},{"app_max_temp":25.5,"app_min_temp":23.8,"clouds":81,"clouds_hi":70,"clouds_low":46,"clouds_mid":80,"datetime":"2023-08-07","dewpt":20.7,"high_temp":25.5,"low_temp":24,"max_dhi":null,"max_temp":25.5,"min_temp":22.9,"moon_phase":0.466463,"moon_phase_lunation":0.72,"moonrise_ts":1691463702,"moonset_ts":1691431517,"ozone":291.2,"pop":75,"precip":9.23,"pres":1011.8,"rh":81,"slp":1011.8,"snow":0,"snow_depth":0,"sunrise_ts":1691402308,"sunset_ts":1691453069,"temp":24.1,"ts":1691380860,"uv":4.1,"valid_date":"2023-08-07","vis":17.426,"weather":{"code":201,"icon":"t02d","description":"Thunderstorm with rain"},"wind_cdir":"SSE","wind_cdir_full":"south-southeast","wind_dir":162,"wind_gust_spd":7.8,"wind_spd":5.3},{"app_max_temp":27.2,"app_min_temp":25.1,"clouds":54,"clouds_hi":22,"clouds_low":18,"clouds_mid":7,"datetime":"2023-08-08","dewpt":21.6,"high_temp":27.5,"low_temp":22.8,"max_dhi":null,"max_temp":27.5,"min_temp":23.8,"moon_phase":0.359791,"moon_phase_lunation":0.75,"moonrise_ts":1691551681,"moonset_ts":1691522040,"ozone":305.3,"pop":80,"precip":11.26,"pres":1003.5,"rh":79,"slp":1003.5,"snow":0,"snow_depth":0,"sunrise_ts":1691488766,"sunset_ts":1691539396,"temp":25.6,"ts":1691467260,"uv":6.5,"valid_date":"2023-08-08","vis":23.063,"weather":{"code":201,"icon":"t02d","description":"Thunderstorm with rain"},"wind_cdir":"SSW","wind_cdir_full":"south-southwest","wind_dir":210,"wind_gust_spd":8.8,"wind_spd":5.9},{"app_max_temp":27.6,"app_min_temp":23,"clouds":24,"clouds_hi":12,"clouds_low":25,"clouds_mid":0,"datetime":"2023-08-09","dewpt":17.1,"high_temp":27.6,"low_temp":22.8,"max_dhi":null,"max_temp":27.6,"min_temp":22.5,"moon_phase":0.262733,"moon_phase_lunation":0.78,"moonrise_ts":1691639866,"moonset_ts":1691612365,"ozone":317.2,"pop":20,"precip":0.12,"pres":1005.3,"rh":61,"slp":1005.3,"snow":0,"snow_depth":0,"sunrise_ts":1691575224,"sunset_ts":1691625721,"temp":25.3,"ts":1691553660,"uv":7.8,"valid_date":"2023-08-09","vis":24.128,"weather":{"code":802,"icon":"c02d","description":"Scattered clouds"},"wind_cdir":"WNW","wind_cdir_full":"west-northwest","wind_dir":284,"wind_gust_spd":9.4,"wind_spd":6.2},{"app_max_temp":29.9,"app_min_temp":23.2,"clouds":33,"clouds_hi":42,"clouds_low":25,"clouds_mid":24,"datetime":"2023-08-10","dewpt":17.1,"high_temp":29.4,"low_temp":23.8,"max_dhi":null,"max_temp":29.4,"min_temp":22.6,"moon_phase":0.178287,"moon_phase_lunation":0.82,"moonrise_ts":1691641961,"moonset_ts":1691702352,"ozone":302.1,"pop":0,"precip":0,"pres":1005.8,"rh":57,"slp":1005.8,"snow":0,"snow_depth":0,"sunrise_ts":1691661683,"sunset_ts":1691712044,"temp":26.4,"ts":1691640060,"uv":9.4,"valid_date":"2023-08-10","vis":24.112,"weather":{"code":802,"icon":"c02d","description":"Scattered clouds"},"wind_cdir":"WSW","wind_cdir_full":"west-southwest","wind_dir":240,"wind_gust_spd":4.7,"wind_spd":4.2},{"app_max_temp":30.2,"app_min_temp":24.2,"clouds":50,"clouds_hi":74,"clouds_low":29,"clouds_mid":39,"datetime":"2023-08-11","dewpt":18.7,"high_temp":29.3,"low_temp":23.1,"max_dhi":null,"max_temp":29.3,"min_temp":23.8,"moon_phase":0.108657,"moon_phase_lunation":0.85,"moonrise_ts":1691730853,"moonset_ts":1691791879,"ozone":302.9,"pop":0,"precip":0,"pres":1008.7,"rh":64,"slp":1008.7,"snow":0,"snow_depth":0,"sunrise_ts":1691748141,"sunset_ts":1691798288,"temp":26.3,"ts":1691726460,"uv":9.3,"valid_date":"2023-08-11","vis":20.688,"weather":{"code":803,"icon":"c03d","description":"Broken clouds"},"wind_cdir":"WSW","wind_cdir_full":"west-southwest","wind_dir":248,"wind_gust_spd":3.8,"wind_spd":3.8}],"lat":40.7143,"lon":-74.006,"state_code":"NY","timezone":"America/New_York"});
})