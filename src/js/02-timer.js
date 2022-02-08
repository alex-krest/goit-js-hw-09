import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      return alert('Please choose a date in the future');
    }
    const time = selectedDates[0].getTime() - options.defaultDate.getTime();
    console.log(time);
    return time;
  },
};
// ---------------------------------------------
const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  startEl: document.querySelector('button[data-start]'),
  dayEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};
console.log(refs.dayEl.textContent);
// ----------------------------------------------
flatpickr(refs.inputEl, options);
// --------------------------------------------------
refs.startEl.addEventListener('click', onStart);

function onStart() {
  setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(options.onClose);
    refs.dayEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minutesEl.textContent = minutes;
    refs.secondsEl.textContent = seconds;
  }, 1000);
  refs.startEl.disabled = true;
}
// -------------------------------------------------
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
