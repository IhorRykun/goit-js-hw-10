import './css/styles.css';
import throttle from 'lodash.throttle';

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};


const DEBOUNCE_DELAY = 300;
