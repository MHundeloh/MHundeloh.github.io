/* Global Variables */
const weatherAppBaseUrl = 'https://api.weatherbit.io/v2.0/';
const weatherIconUrl = 'https://www.weatherbit.io/static/img/icons/';
const geoNameAppBaseUrl = 'http://api.geonames.org/searchJSON?maxRows=3&q=';
const imageAppBaseUrl = 'https://pixabay.com/api/';
const forecastDays = 7; // maximum for free WeatherBit accounts
const resultHolder = document.querySelector('#result-holder');

// Personal API Key for WeatherBit API
// Note:
// to avoid having an api key in source code the api key will be retrieved asynchronously
// when generating the WeatherBit API url

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
    /* i.m.o. the retrieving the current weather doesn't make sense */
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

/* Get weather data for given coordinates */
const getWeatherData = async(lat, lon, mockup) => {
    let url = '/mockup/weather';
    if (mockup === false) {
        url = await weatherUrlGenerator(lat, lon, forecastDays);
    }
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

/* Update UI with weather and location data */
const updateUI = async () => {
    const destination = document.querySelector('#destination');
    const imageDiv = document.querySelector('#image');
    imageDiv.innerHTML = '';
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
            const weatherFragment = document.createDocumentFragment();
            destination.innerHTML = allData.city + ' in '+ allData.country + ' (lat: ' + allData.lat + ' / lon: ' + allData.lon + ')';
            if (allData.imageUrl.length > 0) {
                const figure = document.createElement('figure');
                const image = document.createElement('img');
                image.src = allData.imageUrl;
                image.alt = 'picture of ' + allData.city;
                image.title = 'picture of ' + allData.city;
                figure.appendChild(image);
                const figcaption = document.createElement('figcaption');
                figcaption.innerText = 'A short glance at ' + allData.city;
                figure.appendChild(figcaption);
                imageDiv.appendChild(figure);
            }
            const header = document.createElement('h2');
            let headerText = 'Your journey starts today';
            if (allData.days > 0) {
                let plurals = '';
                if (allData.days > 1) {
                    plurals = 's';
                }
                headerText = 'Your journey will start in ' + allData.days + ' day' + plurals;
            }
            header.innerHTML = headerText + ' - ' + forecastDays + " day weather forecast for your destination";
            weatherFragment.appendChild(header);
            allData.weather.forEach((entry) => {
                const daysDiv = document.createElement('div');
                daysDiv.classList.add('day-wrapper');
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('col-date');
                dateDiv.innerHTML = entry.valid_date;
                daysDiv.appendChild(dateDiv);

                const textDiv = document.createElement('div');
                const forecastText = document.createTextNode(entry.weather.description);
                textDiv.classList.add('col-text');
                textDiv.appendChild(forecastText);
                daysDiv.appendChild(textDiv);

                const iconDiv = document.createElement('div');
                const iconUrl = weatherIconUrl + entry.weather.icon + '.png';
                const iconImage = document.createElement('img');
                iconImage.src = iconUrl;
                iconImage.alt = entry.weather.description;
                iconDiv.classList.add('col-icon');
                iconDiv.appendChild(iconImage);
                daysDiv.appendChild(iconDiv);

                const tempDiv = document.createElement('div');
                tempDiv.classList.add('col-temp');
                tempDiv.innerHTML = '<span class="text-large">'+ entry.high_temp + ' °C</span><span class="text-small">/ '+ entry.low_temp + ' °C' +'</span>';
                daysDiv.appendChild(tempDiv);

                const feelDiv = document.createElement('div');
                feelDiv.classList.add('col-feel');
                feelDiv.innerHTML = '<span class="text-small">like '+ entry.app_max_temp + ' °C</span><span class="text-small">/ '+ entry.app_min_temp + ' °C' +'</span>';
                daysDiv.appendChild(feelDiv);

                const precipIconDiv = document.createElement('div');
                precipIconDiv.classList.add('col-precip-icon');
                precipIconDiv.innerHTML = '<span class="text-small">Precipitation</span>';
                daysDiv.appendChild(precipIconDiv);

                const precipDiv = document.createElement('div');
                precipDiv.classList.add('col-precip');
                precipDiv.innerText = Math.round(entry.precip) + ' l/m²';
                daysDiv.appendChild(precipDiv);

                const probIconDiv = document.createElement('div');
                probIconDiv.classList.add('col-prob-icon');
                probIconDiv.innerHTML = '<span class="text-small">Probability</span>';
                daysDiv.appendChild(probIconDiv);

                const probDiv = document.createElement('div');
                probDiv.classList.add('col-prob');
                probDiv.innerText = entry.pop + '%';
                daysDiv.appendChild(probDiv);

                weatherFragment.appendChild(daysDiv);
            })
            // content.innerHTML = '<b>Weather forecast: </b>' + allData.weather[0].weather.description + '<span>' + allData.weather[0].weather.icon + '</span>';
            weatherForecast.appendChild(weatherFragment);
            resultHolder.style.display = 'block';
        }
    } catch(error) {
        console.log('Error', error);
        showMessage(error);
    }
}

/* show message */
const showMessage = (messageText) => {
    const messageHolder = document.querySelector('#messageHolder');
    let message = document.querySelector('#message');
    if (message === null) {
        message = document.createElement('div');
    } else {
        message.innerHTML = '';
    }
    message.setAttribute('id', 'message');
    message.innerHTML = '<b>Warning: </b>' + messageText;
    messageHolder.appendChild(message);
    resultHolder.style.display = 'block';
}

/* main action */
function performAction(e) {
    const city = document.querySelector('#city').value;
    const start = document.querySelector('#start').value;
    const startDate = new Date(start);
    startDate.setHours(0);
    // calculate date difference from milliseconds
    const days = Math.floor((startDate - currDate) / 86400000);

    getGeoData(city)
        .then(function(geoData){
            if (geoData.geonames !== undefined) {
                let geoname = geoData.geonames[0];
                let lon = geoname.lng;
                let lat = geoname.lat;
                getWeatherData(lat, lon, false)
                    .then(function (weatherData){
                        if (weatherData !== undefined) {
                            if (weatherData.data !== undefined) {
                                getImageData(city)
                                    .then(function (imageData) {
                                        let imageUrl = '';
                                        if (parseInt(imageData.totalHits) > 0) {
                                            let index = Math.floor(Math.random() * imageData.hits.length);
                                            console.log(index);
                                            imageUrl = imageData.hits[index].webformatURL;
                                        }
                                        saveData({
                                            date: start,
                                            days: days,
                                            myCity: weatherData.city_name,
                                            lon: lon,
                                            lat: lat,
                                            country: weatherData.country_code,
                                            imageUrl: imageUrl,
                                            weather: weatherData.data
                                        })
                                            .then(
                                                updateUI()
                                            )
                                    });
                            } else {
                                showMessage('weather data can not be retrieved - for unknown reason');
                            }
                        } else {
                            console.log(weatherData);
                            showMessage('weather data cannot be retrieved - service is unavailable');
                        }
                    })
            } else {
                showMessage('geo data cannot be retrieved - ' + geoData.message + ' #' + geoData.cod);
            }
        })
}

export { performAction }