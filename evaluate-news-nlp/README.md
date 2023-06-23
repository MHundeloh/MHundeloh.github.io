# Evaluate News with NLP App Project

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
integrating an external NLP API and updating the UI with retrieved data.

It shows a landing page with an empty form and input fields for text and an url.

Based on the starter project files ([see Dependencies](#dependencies)) I added the server's and app's functionality functions for

Server:
* setup local server listening on port 8080
* initialize the main project folder to /dist where index.html resides
* build POST and GET routes for
  * sending the index.html from document root
  * calling the analyzeText function with given text or url
* function for
  * analyzing text or url by calling external NLP API (Meaning Cloud)

Frontend:
* init page content with 
  * input fields (text, url), 
  * a analyze button and 
  * a result text area
* functions for 
  * handling form data based on given text and / or URL
  * validating given url 
  * sending text and url to backend
  * updating UI by API response data
  * alerting the user if inputs are empty or not valid
  * showing error message if something goes wrong

This landing page is build with HTML, SASS and JavaScript.

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
- Set up a free Meaning Cloud account and generate an API key
- Add an environment variable API_KEY for the API key in a .env file
  - e.g. API_KEY="abcd1234xyz"
  - the .env file should be .gitignore(d)
- Start a local webserver in a shell by calling 
```
npm run start
```
- Call "localhost:8080" in your favorite browser

## Project structure
```
/evaluate-news-nlp
    - dist
        index.html
        main.css
        main.js
        service-worker.js
        workbox-2b403519.js
    - src
        - __tests__
            formHandler.spec.js
            isValidUrl.spec.js
            prepareData.spec.js
        - client
            - js
                formHandler.js
                isValidUrl.js
                prepareData.js
            - styles
                base.scss
                footer.scss
                form.scss
                header.scss
                resets.scss
            - views
                index.html
            index.js
        - server
            index.js
            mockAPI.js
        .babelrc
        .env
        .gitignore
        jest.config.js
        package.json
        package-lock.json
        README.md
        webpack.dev.js
        webpack.prod.js
```

## Dependencies
Udacity starter project files <https://github.com/udacity/fend/tree/refresh-2019/projects/evaluate-news-nlp>

Meaning Cloud API <https://api.meaningcloud.com/sentiment-2.1>

JS Version: ES2015/ES6

## Usage

### Page content
The page content is generated dynamically.

On first page load all input fields are provided by placeholders.
The text area "Results" is empty.

To get a free text analyzed
- type in the text in first input field ("Enter your text for analysis (preferred)") 
- Click the button "analyze"

To get a blog article analyzed 
- type in a valid url in second input field ("Enter a valid URL for analysis")
- Click the button "analyze"

If both input fields are filled only the text field will get analyzed!

## Event handling
### Click on Generate button
Clicking on the Generate button will call the handleSubmit function.

The text area ("Results") will be 
- cleared first
- then updated by structured text analysis data

### Error handling
If both the free text input field and the url input fields are left empt the user will be alerted 
that at least one input field should be filled.

If the given URL does not start with "http:" or "https:" the user will be alerted that the URL is invalid.

If the API does not response with a sentence list the result textarea will be filled with "nothing to analyze".

## Integration

The Evaluate News with NLP App Project is part of all my projects residing at [GitHub](https://github.com/MHundeloh.github.io)

## Author
Matthias Hundeloh - Arvato Systems GmbH - Bertelsmann AG

Contact me via [email](mailto:matthias.hundeloh@bertelsmann.de)

You can find my projects at [GitHub](https://github.com/MHundeloh)

## License
The content of this project itself is licensed under the [MIT License](../LICENSE).