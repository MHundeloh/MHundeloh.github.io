# Landing Page Project

## Table of Contents

* [Desciption](#description)
* [Installation](#installation)
* [Project structure](#project-structure)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Event handling](#event-handling)
* [Integration](#integration)
* [Author](#author)
* [License](#license)

## Description

This project was build as part of the Udacity Nanodegree Front End Development course for manipulating the DOM.

It shows a landing page with dynamically generated content like sections and navigation.

Based on the starter project files ([see Dependencies](#dependencies)) I added the app's functionality as main functions for
* init page content
* building the navigation based on sections using id and data-nav attributes
* scrolling to the appropriate section when click on a menu item happens
* changing the status of a section when scrolled into view

In addition, I have added some helper functions to reuse and avoid duplicate code.

This landing page is build with HTML, CSS and JavaScript.

## Installation
- Clone the main repository from [GitHub](https://github.com/MHundeloh/MHundeloh.github.io)
- Copy all project files to the document root of your webserver
- Call the /landing-page/index.html in your favorite browser

## Project structure
```
/landing-page
    - css
        - styles.css
    - js
        - app.js
    index.html
    README.md
```

## Dependencies
Udacity starter project files <https://github.com/udacity/fend/tree/refresh-2019/projects/landing-page>

Google Fonts: [Fira Sans, Merriweather](https://fonts.googleapis.com/css?family=Fira+Sans:900|Merriweather&display=swap)

JS Version: ES2015/ES6

## Usage

### Page content
The page content is generated dynamically. 

Based on a constant "countOfSection" an appropriate number of section will be generated:
```
const countOfSections = 4;
```
Change the number to generate more or less sections on first page load.

On first page load the first section is always marked as "active".

### Navigation
Based on the sections in the page the navigation menu items will be generated dynamically.

## Event handling
### Click on navigation menu item
Clicking on a navigation menu item moves the content of the page to the corresponding section in a smooth way.

The section will be marked as "active".

The clicked menu item will be highlighted.

### Scrolling the page content
When scrolling the content of the page a section will be marked as "active" when half of the sections height is visible in the viewport.

The corresponding navigation menu item will be highlighted whilst the highlighting of all the other menu items will disappear. 

## Integration

The Landing Page Project is part of all my projects residing at [GitHub](https://github.com/MHundeloh.github.io)

You can switch to this project by clicking the second card on start page

## Author
Matthias Hundeloh - Arvato Systems GmbH - Bertelsmann AG

Contact me via [email](mailto:matthias.hundeloh@bertelsmann.de)

You can find my projects at [GitHub](https://github.com/MHundeloh)

## License
The content of this project itself is licensed under the [MIT License](../LICENSE).