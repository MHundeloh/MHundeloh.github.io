/* Global Variables */
const apiKey = 'c28021...&units=metric';
const weatherAppBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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

const saveData = async (data = {}) => {
    const url = '/set';
    const response = await postData(url, data);
    try {
        return await response.json();
    } catch(error) {
        console.log('Error', error);
    }
}

const getWeatherData = async (location) => {
    const url = weatherAppBaseUrl + location + '&APPID=' + apiKey;
    const request = await fetch(url);
    try {
        const weatherData = await request.json();
        console.log(weatherData);
        console.log(weatherData.main.temp);
        return weatherData;
    } catch (error) {
        console.log('error', error);
    }
}

function updateUI(weatherData) {
    const entryHolder = document.querySelector('#entryHolder');
    const date = document.querySelector('#date');
    const temp = document.querySelector('#temp');
    const content = document.querySelector('#content');
    date.innerHTML = newDate;
    temp.innerHTML = weatherData.main.temp + ' degree';
    content.innerHTML = 'content';
}

const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', ()=> {
    const zip = document.querySelector('#zip').value;
    getWeatherData(zip)
        // .then(saveData)
        .then(updateUI)
    ;
})