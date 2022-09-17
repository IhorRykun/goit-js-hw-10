import { remove, throttle } from 'lodash';

const buttonStart = document.querySelector('button[data-start]');
console.log(buttonStart);
const buttonStop = document.querySelector('button[data-stop]');
console.log(buttonStop);

// !    Функція радномного кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//  !   Функція стопу
buttonStop.addEventListener('click', () => {
  buttonStop.disabled = true;
  buttonStart.disabled = false;
  // !    Скидаємо  інтервал
  clearInterval(timerId);
});

let timerId = null;
//  !   Функція  старту
buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  //  !   Створюємо інтервал при якому змінюються кольори нашого body
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
