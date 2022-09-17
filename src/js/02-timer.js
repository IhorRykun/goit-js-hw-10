import flatpickr from 'flatpickr';
// Імпорт стилів календаря
import 'flatpickr/dist/flatpickr.min.css';
// Бібліотека повідомлень
import Notiflix from 'notiflix';

// !    Дістаємо елементи 
const selector = document.querySelector('#datetime-picker');

const timer = document.querySelector('.timer');

const field = Array.from(document.querySelectorAll('.field'));

const value = Array.from(document.querySelectorAll('.value'));

const label = Array.from(document.querySelectorAll('.label'));

const btnStart = document.querySelector('button[data-start]');

const days = document.querySelector('[data-days]');

const hours = document.querySelector('[data-hours]');

const minutes = document.querySelector('[data-minutes]');

const seconds = document.querySelector('[data-seconds]');

let selectDate = null;


//  !   Бібліотека  flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectDate) {
    let deltaTime = selectDate[0].getTime() - currentDate;

    if (deltaTime <= 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      selector.disabled = false;

      btnStart.addEventListener('click', () => {
        btnStart.disabled = true;
        selector.disabled = true;

        const timer = setInterval(() => {
          const newTime = Date.now();
          this.isActive = true;
          const newDelta = selectDate[0].getTime() - newTime;
          const newTimeComp = convertMs(newDelta);
          seconds.textContent = addLeadingZero(newTimeComp.seconds);
          minutes.textContent = addLeadingZero(newTimeComp.minutes);
          hours.textContent = addLeadingZero(newTimeComp.hours);
          days.textContent = addLeadingZero(newTimeComp.days);
          console.log(newDelta);
          if (newDelta <= 1000) {
            clearInterval(timer);
          }
        }, 1000);
      });
    }
  },
};

flatpickr(selector, options);

const currentDate = Date.now();


//  !   Функція обрахунку днів, годин, хвилин   

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//  !   Функція яка робить  подвійне значення 

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
