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
const navbarList = document.querySelector('#navbar__list');
const countOfSections = 4;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description Create a paragraph (p) element
 * @param content - Paragraph's content
 * @returns {HTMLParagraphElement}
 */
function createParagraph(content) {
    let paragraph = document.createElement("p");
    paragraph.innerHTML = content;
    return paragraph;
}

/**
* @description Create section element
* @param {number} index - The nth section to create
*/
function createSectionElement(index) {
    // create section element
    const section = document.createElement("section");
    section.setAttribute("id", "section" + index);
    const sectionName = "Section " + index;
    section.setAttribute("data-nav", sectionName);

    // reset all css classes
    section.className = "";
    // initial active class only to first section
    if (index === 1) {
        section.classList.add("active");
    }

    // create sections div element
    const div = document.createElement("div");
    div.className = "landing__container";

    // create sections div header element
    const header = document.createElement("h2")
    header.innerHTML = sectionName;

    // append child elements to sections div element
    div.appendChild(header);
    div.appendChild(createParagraph("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod."));
    div.appendChild(createParagraph("Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non."));

    // append div element to section
    section.appendChild(div);
    return section;
}

/**
 * @description Create menu item from element with link to elements anchor
 * @param {Element} element - Element for which a navigation item should be created
 * @returns {HTMLLIElement}
 */
function createNavItem(element) {
    const elementId = element.id;
    const dataNav = element.dataset.nav;

    // build anchor element
    let anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', '#' + elementId);
    anchorElement.setAttribute('id', 'link_' + elementId);
    anchorElement.innerText = dataNav;
    anchorElement.classList.add('menu__link');

    // add anchor element to list item
    let liElement = document.createElement('li');
    liElement.appendChild(anchorElement);

    return liElement;
}

/**
 * @description Helper function to get list of sections
 * @returns {NodeListOf<Element>}
 */
function getSectionList() {
    return document.querySelectorAll('main section');
}

/**
 * @description Get DOMRect object for given element
 * @param {Element} element
 * @returns {DOMRect}
 */
function getRectangle(element) {
    return element.getBoundingClientRect();
}

/**
 * @description Remove active class
 * @param {Element} el - Element which "active" class has to be removed
 */
function removeActiveClass(el) {
    el.classList.remove('active');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * @description init page content
 */
function initPage() {
    const mainFrag = document.createDocumentFragment();
    for (let index = 1; index <= countOfSections; index++) {
        const sectionElement = createSectionElement(index);
        mainFrag.appendChild(sectionElement);
    }
    let mainElement = document.querySelector("main");
    mainElement.appendChild(mainFrag);
}

/**
 * @description build the nav
 */
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

/**
 * @description Add class 'active' to section - deactivate all others
 * @param {Element} element - The section element which has to be activated
 */
function activateSection(element) {
    const sectionList = getSectionList();
    sectionList.forEach(removeActiveClass);
    element.classList.add('active');
}

/**
 * @description Add class 'active' to menu link element
 * @param element - Anchor element which has to be activated - deactivate all others
 */
function activateNavItem(element) {
    const navItemList = document.querySelectorAll('.menu__link');
    navItemList.forEach(removeActiveClass);
    element.classList.add('active');
}

/**
 * @description Scroll to anchor ID using click event
 * @param {Event} event - Click event
 */
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

/**
 * @description Scroll listener for setting sections and corresponding menu link to active when near top of viewport
 */
function scrollListener() {
    const sectionList = getSectionList();
    for (const section of sectionList) {
        const rect = getRectangle(section);
        const halfHeight = rect['height'] / 2;
        const navBarItem = document.querySelector("#link_" + section.getAttribute('id'));
        // activate section and nav bar item only when sections rectangle is half visible
        if (rect['top'] <= halfHeight && rect['bottom'] >= halfHeight) {
            // nav bar item only when scrolled down (window.scrollY > 0)
            if (window.scrollY > 0) {
                activateNavItem(navBarItem);
            } else {
                removeActiveClass(navBarItem);
            }
            activateSection(section);
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Init page content - create section elements
initPage();

// Build menu 
buildNavigation();

// Scroll to section on link click
navbarList.addEventListener('click', scrollToAnchor);

// Set sections as active on scroll event
document.addEventListener('scroll', scrollListener);
