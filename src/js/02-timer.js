import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  startEl: document.querySelector('button[data-start]'),
};
flatpickr(refs.inputEl, options);
// -----------------------------------------------------
// window.alert('Please choose a date in the future');
// refs.startEl.disabled = true;
// refs.startEl.disabled = false;
// -----------------------------------------------------
const currentDate = options.defaultDate;

console.log(currentDate);
console.log(currentDate.getTime());
