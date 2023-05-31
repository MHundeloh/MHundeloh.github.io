# Weather-Journal App Project

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
integrating an external weather API and updating the UI with retrieved data.

It shows a landing page with an empty form and input fields for ZIP code and a textual description of the users feelings.

Based on the starter project files ([see Dependencies](#dependencies)) I added the server's and app's functionality functions for

Server:
* setup local server listening on port 3000
* initialize the main project folder to /website where index.html resides
* build POST and GET routes for
  * saving project data
  * getting api key from environment
  * getting project data

Frontend:
* init page content with 
  * input fields (zip code, text), 
  * a generate button and 
  * a text area
* functions for 
  * building api url based on given zip code and API key
  * retrieving weather data 
  * sending weather data and text to backend project data
  * retrieving project data
  * updating UI by project data
  * showing weather api error messages 

This landing page is build with HTML, CSS and JavaScript.

## Installation
- Install node on your local computer
- Add the following packages
  - Express
  - Body-Parser
  - Cors
  - Dotenv
- Clone the main repository from [GitHub](https://github.com/MHundeloh/MHundeloh.github.io)
- Set up a free OpenWeather account and generate an API key
- Add an environment variable API_KEY for the API key in a .env file
  - e.g. API_KEY="abcd1234xyz"
  - the .env file should be .gitignore(d)
- Start a local webserver in a shell by calling 
```
node server.js
```
- Call "localhost:3000" in your favorite browser

## Project structure
```
/weather-journal-app
    - website
        app.js
        favicon.ico
        index.html
        styles.css
    button.png
    README.md
    server.js
```

## Dependencies
Udacity starter project files <https://github.com/udacity/fend/tree/refresh-2019/projects/weather-journal-app>

OpenWeather API <https://openweathermap.org/api>

Google Fonts: [Oswald, Ranga](https://fonts.googleapis.com/css?family=Oswald:400,600,700|Ranga:400,700&display=swap)

JS Version: ES2015/ES6

## Usage

### Page content
The page content is generated dynamically.

On first page load all input fields are provided by placeholders.
The text area "Most recent entry" is empty.

To get current weather data for a region 
- type in a valid zip code or a valid city name into first input field ("Enter zipcode or city name here")
- fill in the textarea field ("How are you feeling today?") optionally.
- Click the button

![button.png](button.png)

## Event handling
### Click on Generate button
Clicking on the Generate button will call the performAction function.

The text area ("Most Recent Entry") will be updated by
- Current date
- Temperature at given city in degree celsius
- Name of found city
- Text from the feelings textarea

### Error handling
If the weather data cannot be retrieved from the OpenWeather API a corresponding error message will appear at the text area.
Previously found weather data will stay in UI in case of an error until you enter valid data.

## Integration

The Weather Journal App Project is part of all my projects residing at [GitHub](https://github.com/MHundeloh.github.io)

## Author
Matthias Hundeloh - Arvato Systems GmbH - Bertelsmann AG

Contact me via [email](mailto:matthias.hundeloh@bertelsmann.de)

You can find my projects at [GitHub](https://github.com/MHundeloh)

## License
The content of this project itself is licensed under the [MIT License](../LICENSE).