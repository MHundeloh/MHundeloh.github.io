import { performAction } from './js/application.js';

import './styles/resets.scss'
import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/forecast.scss'

/* add event listener to generate button */
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', performAction);
