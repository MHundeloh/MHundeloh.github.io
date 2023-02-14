/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let navbarList = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Create menu item from section element with link to section anchor
function createNavItem(element) {
    const sectionId = element.id;
    const dataNav = element.dataset.nav;

    // build anchor element
    let anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', '#' + sectionId);
    anchorElement.setAttribute('id', 'link_' + sectionId);
    anchorElement.innerText = dataNav;
    anchorElement.classList.add('menu__link');

    // add anchor element to list item
    let liElement = document.createElement('li');
    liElement.appendChild(anchorElement);

    return liElement;
}

// Helper function to get list of sections
function getSectionList() {
    return document.querySelectorAll('main section');
}

// Get DOMRect object for given element
function getRectangle(element) {
    return element.getBoundingClientRect();
}

// Remove active class
function removeActiveClass(el) {
    el.classList.remove('active');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigation() {
    const navbarFrag = document.createDocumentFragment();
    const sectionList = getSectionList();
    for (let i = 0; i < sectionList.length; i++) {
        let navItem = createNavItem(sectionList[i]);
        // append nav list item to document fragment
        navbarFrag.appendChild(navItem);
    }
    navbarList.append(navbarFrag);
}

// Add class 'active' to section
function activateSection(element) {
    const sectionList = getSectionList();
    sectionList.forEach(removeActiveClass);
    element.classList.add('active');
}

// Add class 'active' to menu link
function activateNavItem(element) {
    const navItemList = document.querySelectorAll('.menu__link');
    navItemList.forEach(removeActiveClass);
    element.classList.add('active');
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchor(event) {
    let target = event.target;
    event.preventDefault();
    if (target.nodeName === 'A' ) {
        const elementID = target.getAttribute('href');
        const element = document.querySelector(elementID);
        element.scrollIntoView({
            behavior: 'smooth'
        });
        // activateNavItem(target);
        activateSection(element);
    }
}

// Scroll listener for setting sections and corresponding menu link to active when near top of viewport
function scrollListener() {
    const sectionList = getSectionList();
    for (const section of sectionList) {
        const rect = getRectangle(section);
        if (rect['top'] <= 100 && rect['bottom'] >= 150) {
            const navBarItem = document.querySelector("#link_" + section.getAttribute('id'));
            activateNavItem(navBarItem);
            activateSection(section);
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavigation();

// Scroll to section on link click
navbarList.addEventListener('click', scrollToAnchor);

// Set sections as active
document.addEventListener('scroll', scrollListener);
