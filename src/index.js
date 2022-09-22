import './css/styles.css';
import throttle from 'lodash.throttle';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';


// !    зробили силки на наші об’єкти
const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInputChenge, DEBOUNCE_DELAY));

// ! Функція  пустього рядка 
function onInputChenge(e) {
    eraseHtml();
    const name = e.target.value;
    if (name === "") {
        return;
    }
API.fetchCountries(name).then(renderResult).catch(rejectedResult);
}


function eraseHtml() {
    refs.ul.innerHTML = "";
    refs.div.innerHTML = "";
}


function renderResult(result) {
    const resultLength = result.length;
    if (result > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
    }
    if (resultLength >= 2 && resultLength <= 10) {
        refs.div.insertAdjacentHTML('beforeend', infoCantry(result));
    }
}

function nameCantry(result) {

    return result.map(
      obj =>
        `<li><img src="${obj.flags.svg}" width="30" heihgt="20"> "${obj.name.official}"</img></li>`
    );
}

function infoCantry(result) {
return result.map(
  obj => `<li><img src = "${obj.flags.svg}" width=30 height=20> ${
    obj.name.official
  }</li> 
  <li>capital: ${obj.capital.join('')}</li>
  <li>population: ${obj.population}</li>
  <li>languages: ${Object.values(obj.languages).join('')}</li>`
);
}

function rejectedResult() {
  Notify.failure('Oops, there is no country with that name');
}