import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let finishDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //  time = selectedDates[0].getTime() - options.defaultDate.getTime();
    finishDate = selectedDates[0].getTime();
    console.log(finishDate);
  },
};
// НЕ МЕНЯЕТСЯ!!!!!
console.log(finishDate);
// ---------------------------------------------
const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  startEl: document.querySelector('button[data-start]'),
  dayEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};
// ----------------------------------------------
flatpickr(refs.inputEl, options);
// -По кнопке включаем таймер
refs.startEl.addEventListener('click', timer);
// -----------------------------------------------------
// -Берем обьект из функции convertMs и присваиваем счетчику в интерфейсе данные
function updateClock({ days, hours, minutes, seconds }) {
  refs.dayEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}
// -Добавляет 0 к одиночному числу
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// --Высчитывает к-во минут, часов, дней из к-ва секунд+обернута вышепрописанной функцией
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
// --Коллбек функция для кнопки старта
function timer() {
  let interval = null;
  refs.startEl.setAttribute('disabled', 'disabled');
  // --Дествие с частотой 1 раз в секунду
  interval = setInterval(counterTime, 1000);
  //  Колбек функция для вышенаписанной функции.
  function counterTime() {
    const currentDate = Date.now();
    const differenceTime = finishDate - currentDate;
    if (differenceTime < 0) {
      clearInterval(interval);
      return alert('Please choose a date in the future');
    }
    //  В переменной вызываем функцию и передаем ей разницу между временем сейчас и выбранной датой в секундах
    const time = convertMs(differenceTime);
    //  Вызываем функйию и передаем ей обьект с днями, часами, минутами и секундами для присваивания их счетчику в интерфейсе
    updateClock(time);
  }
}
