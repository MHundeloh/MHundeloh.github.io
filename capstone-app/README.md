# Capstone Travel Weather App Project

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Project structure](#project-structure)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Event handling](#event-handling)
* [Integration](#integration)
* [Author](#author)
* [License](#license)

## Description

This project was build as part of the Udacity Nanodegree Front End Development course for running a local web server, 
integrating an external geographic API, a weather API, a picture service API and updating the UI with retrieved data.

It shows a landing page with an empty form with an input field for destination and a date picker for the journey's start date.

Based on the files of a former project ([see Dependencies](#dependencies)) I added the server's and app's functionality functions for

Server:
* setup local server listening on port 3000
* initialize the main project folder to /dist where index.html resides
* build POST and GET routes for
  * sending the index.html from document root
  * saving project data
  * getting several api keys from environment
  * getting project all data
  * getting mockup weather data to avoid the limited number of calls to the external weather api while developing
    * the method getWeatherData has got a boolean parameter "mockup" - to mock the weather data calls change the function calls in application.js

Frontend:
* init page content with 
  * input fields and date picker (destination, start date), 
  * a generate button
* functions for 
  * getting the api keys for geoname api, weatherbit api and pixabay api
  * building geoname api url based on given destination name (url encoded) and API key
  * building weatherbit api url based on given lat and long values of destination, forecast days and API key
  * building pixabay api url based on given destination name (url encoded) and API key
  * retrieving geographic data 
  * retrieving weather data
  * retrieving image data
  * sending all gathered data to backend project data
  * retrieving project data
  * updating UI by project data
  * showing api error messages 

This landing page is build with HTML, CSS and JavaScript.

## Installation
- Install node on your local computer
- Add the following packages
  - Express
  - Body-Parser
  - Cors
  - Dotenv
  - Webpack / Webpack-CLI
  - Workbox-Webpack-Plugin
  - Babel
  - CSS-Loader
  - CSS-Minimizer-Webpack-Plugin
  - HTML-Webpack-Plugin
  - JEST
  - JEST-Environment-jsdom
  - JSDOM
  - Mini-CSS-Extract-Plugin
  - Node-Sass
  - Sass-Loader
  - Style-Loader
  - Terser-Webpack-Plugin
  - Webpack-Dev-Server
- Clone the main repository from [GitHub](https://github.com/MHundeloh/MHundeloh.github.io)
- Set up a free Geoname account and use your username as API key 
- Set up a free Weatherbit account and generate an API key
- Set up a free Pixabay account and generate an API key
- Add three environment variables for the API key in a .env file
  - WEATHER_API_KEY="abcd1234xyz"
  - GEO_API_KEY="username"
  - PIXA_API_KEY="9876zyxw"
  - the .env file should be .gitignore(d)
- Build the app with Webpack in a shell by calling
```
npm run build
```
- Start a local webserver in a shell by calling 
```
npm run start
```
- Call "localhost:3000" in your favorite browser

## Project structure
```
/capstone-app
    - dist
        index.html
        main.css
        main.js
        service-worker.js
    - src
        - client
            -js
                application.js
            -media
                button.png
                favicon.ico
            -styles
                footer.scss
                forecast.scss
                header.scss
                reset.scss
                style.scss
            - views
                index.html
            index.js
        - server
            server.js  
        .babelrc
        .env
        .gitignore
        package.json
        package-lock.json
        README.md
        webpack.dev.js
        webpack.prod.js
```

## Dependencies
Udacity starter project files <https://github.com/udacity/fend/tree/refresh-2019/projects/weather-journal-app>

Geoname API <http://api.geonames.org/searchJSON>

Weatherbit API <https://api.weatherbit.io/v2.0>

Pixabay API <https://pixabay.com/api/

Google Fonts: [Oswald, Ranga](https://fonts.googleapis.com/css?family=Oswald:400,600,700|Ranga:400,700&display=swap)

JS Version: ES2015/ES6

## Usage

### Calling the web page
Type http://localhost:3000/ into a browser of your choice.

### Page content
The page content is generated dynamically.

On first page load all input fields are provided by placeholders.

To get a weather forecast for a destination 
- type in a valid city name into first input field ("Enter your destination name here")
- pick a valid date (today or near future)
- Click the button

![button.png](src/client/media/button.png)

## Event handling
### Click on Generate button
Clicking on the Generate button will call the performAction function.

The result section will be created or updated by
- Headline with destination name, destinations country, lat and lon coordinates
- Picture of the destination (if available)
- Current weather with
  - Timestamp
  - Weather description
  - Weather icon
  - Measured and perceived temperature in degree Celsius
  - Precipitation
  - Wind and wind direction
- 7 days weather forecast each day with
  - Date
  - Weather description
  - Weather icon
  - Maximum and minimum temperature in degree Celsius
  - Maximum and minimum perceived temperature in degree Celsius
  - Precipitation
  - Probability of precipitation

### Error handling
If the geo or weather data cannot be retrieved from the APIs a corresponding error message will appear at the text area.

## Integration

The Capstone Travel Weather App Project is part of all my projects residing at [GitHub](https://github.com/MHundeloh.github.io)

## Author
Matthias Hundeloh - Arvato Systems GmbH - Bertelsmann AG

Contact me via [email](mailto:matthias.hundeloh@bertelsmann.de)

You can find my projects at [GitHub](https://github.com/MHundeloh)

## License
The content of this project itself is licensed under the [MIT License](../LICENSE).