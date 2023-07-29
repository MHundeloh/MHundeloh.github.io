/* Global Variables */
const weatherAppBaseUrl = 'https://api.weatherbit.io/v2.0/';
const weatherIconUrl = 'https://www.weatherbit.io/static/img/icons/';
const geoNameAppBaseUrl = 'http://api.geonames.org/searchJSON?maxRows=3&q=';
const imageAppBaseUrl = 'https://pixabay.com/api/';
const forecastDays = 7;

// Personal API Key for OpenWeatherMap API
// Note:
// to avoid having an api key in source code the api key will be retrieved asynchronously
// when generating the OpenWeather API url

// Create a new date instance dynamically with JS
let d = new Date();
let currDateString = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
const currDate = new Date(currDateString);

// async postData function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        return await response.json();
    } catch(error) {
        console.log('Error', error);
    }
}

/* save data to project data */
const saveData = async (data = {}) => {
    const url = '/set';
    const response = await postData(url, data);
    try {
        return response;
    } catch(error) {
        console.log('Error', error);
    }
}

/* retrieve API key from backend */
const getApiKey = async (context) => {
    const response = await fetch('/apikey/'+context);
    try {
        const res = await response.json();
        return res.apikey;
    } catch(error) {
        console.log('Error', error);
    }
}

/* Generate geo API url */
const geoNameUrlGenerator = async (city) => {
    const apiKey = await getApiKey('geonames');
    return geoNameAppBaseUrl + city + '&username=' + apiKey;
}

/* Generate weather API url */
const weatherUrlGenerator = async (lat, lon, days) => {
    /* forecast should be 'current' or 'forecast/daily' */
    let urlTimePart = 'forecast/daily';
    const apiKey = await getApiKey('wheatherbit');
    return weatherAppBaseUrl + urlTimePart + '?key=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&days=' + days;
}

/* Generate iamge API url */
const imageUrlGenerator = async (query) => {
    const apiKey = await getApiKey('pixabay');
    return imageAppBaseUrl + '?key=' + apiKey + '&q=' + encodeURIComponent(query) + '&orientation=horizontal';
}


/* Get geo data for given location */
const getGeoData = async (city) => {
    const url = await geoNameUrlGenerator(city);
    console.log(url);
    const request = await fetch(url);
    try {
        return await request.json();
    } catch (error) {
        console.log('error', error);
    }
}

/* Get weather data for given coordinates and date */
const getWeatherData = async(lat, lon, startDateString) => {
    /* @todo calculate forecast from startDate */
    const startDate = new Date(startDateString);
    // if (startDate > currDate) {
    //     const forecast = 'false';
    // } else {
    //     const forecast = 'true';
    // }
    /* @todo calculate days from startDate */
    const url = await weatherUrlGenerator(lat, lon, forecastDays);
    console.log(url);
    const request = await fetch(url);
    try {
        return await request.json();
    } catch (error) {
        console.log('error', error);
    }
}

/* Get image data for given query string */
const getImageData = async (query) => {
    const url = await imageUrlGenerator(query);
    console.log(url);
    const request = await fetch(url);
    try {
        return await request.json();
    } catch (error) {
        console.log('error', error);
    }
}

/* Call server for data */
const getAllData = async () => {
    const request = await fetch('/all');
    try {
        return request;
    } catch (error) {
        console.log('Error', error);
    }
}

/* Update UI with weather data */
const updateUI = async () => {
    const date = document.querySelector('#date');
    const destination = document.querySelector('#destination');
    const image = document.querySelector('#image');
    const weatherForecast = document.querySelector('#weather');
    weatherForecast.innerHTML = '';
    const message = document.querySelector('#message');
    if (message !== null) {
        message.remove();
    }
    const request = await getAllData();
    try {
        const allData = await request.json();
        if (allData !== undefined) {
            date.innerHTML = '<b>Date: </b>' + allData.date;
            destination.innerHTML = '<b>Location: </b>' + allData.city + ' (lat: ' + allData.lat + ' / lon: ' + allData.lon + ') in '+ allData.country;
            if (allData.imageUrl.length > 0) {
                image.innerHTML = '<img src="' + allData.imageUrl + '" alt="' + allData.city + '">';
            }
            const weatherFragment = document.createDocumentFragment();
            const header = document.createElement('h3');
            header.innerHTML = forecastDays + " Day Forecast";
            weatherFragment.appendChild(header);
            allData.weather.forEach((entry) => {
                const daysDiv = document.createElement('div');
                daysDiv.classList.add('days');
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.innerHTML = entry.valid_date;
                daysDiv.appendChild(dayDiv);
                const forecastDiv = document.createElement('div');
                const iconUrl = weatherIconUrl + entry.weather.icon + '.png';
                const iconImage = document.createElement('img');
                iconImage.src = iconUrl;
                iconImage.alt = entry.weather.description;
                const forecastText = document.createTextNode(entry.weather.description);
                forecastDiv.classList.add('forecast');
                forecastDiv.appendChild(iconImage);
                forecastDiv.appendChild(forecastText);
                daysDiv.appendChild(forecastDiv);
                const tempDiv = document.createElement('div');
                tempDiv.classList.add('temp');
                const tempText = document.createTextNode('Temp: ' + entry.app_max_temp + ' °C (max), ' + entry.app_min_temp + ' °C (min), Precip: ' + Math.round(entry.precip) + ' l/sqm (' + entry.pop + '%)');
                tempDiv.appendChild(tempText);
                daysDiv.appendChild(tempDiv);
                weatherFragment.appendChild(daysDiv);
            })
            // content.innerHTML = '<b>Weather forecast: </b>' + allData.weather[0].weather.description + '<span>' + allData.weather[0].weather.icon + '</span>';
            weatherForecast.appendChild(weatherFragment);
        }
    } catch(error) {
        console.log('Error', error);
        showMessage(error);
    }
}

/* show message */
const showMessage = (messageText) => {
    const entryHolder = document.querySelector('#entryHolder');
    let message = document.querySelector('#message');
    if (message === null) {
        message = document.createElement('div');
    } else {
        message.innerHTML = '';
    }
    message.setAttribute('id', 'message');
    message.innerHTML = '<b>Warning: </b>' + messageText;
    entryHolder.appendChild(message);

}

/* main action */
function performAction(e) {
    const city = document.querySelector('#city').value;
    const start = document.querySelector('#start').value;

    getGeoData(city)
        .then(function(geoData){
            if (geoData.geonames !== undefined) {
                let geoname = geoData.geonames[0];
                let lon = geoname.lng;
                let lat = geoname.lat;
                getWeatherData(lat, lon, start)
                    .then(function (weatherData){
                        if (weatherData.data !== undefined) {
                            getImageData(city)
                                .then(function (imageData) {
                                    let imageUrl = '';
                                    if (parseInt(imageData.totalHits) > 0) {
                                        let index = Math.floor(Math.random() * imageData.totalHits);
                                        imageUrl = imageData.hits[index].webformatURL;
                                    }
                                    saveData({date: start, myCity: city, lon: lon, lat: lat, country: geoname.countryCode, imageUrl: imageUrl, weather: weatherData.data})
                                        .then(
                                            updateUI()
                                        )
                                });
                        } else {
                            showMessage('weather data can not be retrieved - for unknown reason');
                        }
                    })
            } else {
                showMessage('weather data cannot be retrieved - ' + geoData.message + ' #' + geoData.cod);
            }
        })
}

export { performAction }