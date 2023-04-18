/* Global Variables */
const weatherAppBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Personal API Key for OpenWeatherMap API
// Note:
// to avoid having an api key in source code the api key will be retrieved asynchronously
// when generating the OpenWeather API url

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth() + 1) +'.'+ d.getFullYear();

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
const getApiKey = async () => {
    const response = await fetch('/apikey');
    try {
        const res = await response.json();
        return res.apikey;
    } catch(error) {
        console.log('Error', error);
    }
}

/* Generate API url */
const urlGenerator = async (zip) => {
    const apiKey = await getApiKey();
    return weatherAppBaseUrl + zip + '&APPID=' + apiKey;
}

/* Get weather data for given location */
const getWeatherData = async (location) => {
    const url = await urlGenerator(location);
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
    const temp = document.querySelector('#temp');
    const content = document.querySelector('#content');
    const message = document.querySelector('#message');
    if (message !== null) {
        message.remove();
    }
    const request = await getAllData();
    try {
        const allData = await request.json();
        if (allData !== undefined) {
            date.innerHTML = '<b>Date: </b>' + newDate;
            temp.innerHTML = '<b>Temperature: </b>' + Math.round(allData.temp) + ' &#8451; in ' + allData.name;
            content.innerHTML = '<b>Your feeling: </b>' + allData.content;
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
    const zip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;

    getWeatherData(zip)
        .then(function(data){
            if (data.main !== undefined) {
                saveData({date: newDate, temp: data.main.temp, name: data.name, content: feelings})
                    .then(
                        updateUI()
                    )
            } else {
                showMessage('weather data cannot be retrieved - ' + data.message + ' #' + data.cod);
            }
        })
}

/* add event listener to generate button */
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', performAction);
