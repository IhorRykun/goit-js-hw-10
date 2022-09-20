import './css/styles.css';
import throttle from 'lodash.throttle';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;


refs.input.addEventListener('input', debounce(as,DEBOUNCE_DELAY));


function as() {

}