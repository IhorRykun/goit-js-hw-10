import { Notify } from 'notiflix/build/notiflix-notify-aio';

//  !   Стукаємо до всіх елементів нашої форми
const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name=delay]');
const nameStep = document.querySelector('[name=step]');
const nameAmount = document.querySelector('[name=amount]');
const btnClick = document.querySelector('buuton');

//  !   створюємо функцію кліку по нашій кнопці
form.addEventListener('submit', formSubmit);

//  !   Стоврюємо функцію, щоб вона повертала проміс, який виконується чи не виконується через dalay проміжочк часу.

function createPromise(position, delay) {
  return new Promise((fulfill, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function formSubmit(e) {
  e.preventDefault();
  let evDelay = Number(firstDelay.value);
  let evNameStep = Number(nameStep.value);
  let evNameAmount = Number(nameAmount.value);

  //  !   Перебираємо значення через фор
  for (let i = 1; i <= evNameAmount; i++) {
    //  !   Функція createPromise, яка повертає проміс, який виконується або не виконується через daley проміжок часу:
    createPromise(i, evDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    evDelay += evNameStep;
  }
}
