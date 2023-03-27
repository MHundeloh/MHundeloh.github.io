const appid = 'c0b3fad2c5722009da72ec926f358432';

/* Global Variables */
const apiKey = appid + '&units=metric';
const weatherAppBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

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

const saveData = async (data = {}) => {
    const url = '/set';
    const response = await postData(url, data);
    try {
        return response;
    } catch(error) {
        console.log('Error', error);
    }
}

const getWeatherData = async (location) => {
    const url = weatherAppBaseUrl + location + '&APPID=' + apiKey;
    const request = await fetch(url);
    try {
        const weatherData = await request.json();
        return weatherData;
    } catch (error) {
        console.log('error', error);
    }
}

const getAllData = async () => {
    const request = await fetch('/all');
    try {
        return request;
    } catch (error) {
        console.log('Error', error);
    }
}

const updateUI = async () => {
    const entryHolder = document.querySelector('#entryHolder');
    const date = document.querySelector('#date');
    const temp = document.querySelector('#temp');
    const content = document.querySelector('#content');
    const request = await getAllData();
    try {
        const allData = await request.json();
        date.innerHTML = '<b>Date: </b>' + newDate;
        temp.innerHTML = '<b>Temperature: </b>' + allData.temp + ' degree';
        content.innerHTML = '<b>Your feeling: </b>' + allData.mood;
    } catch(error) {
        console.log('Error', error);
    }
}


const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', performAction);

function performAction(e) {
    const zip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;

    getWeatherData(zip)
        .then(function(data){
            saveData({date: newDate, temp: data.main.temp, mood: feelings})
                .then(
                    updateUI()
                )

        })
}