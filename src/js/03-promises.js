const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name=delay]'),
  stepEl: document.querySelector('[name=step]'),
  amountEl: document.querySelector('[name=amount]'),
  buttonEl: document.querySelector('form>button'),
};
console.log(refs.formEl);
console.log(refs.delayEl);
console.log(refs.stepEl);
console.log(refs.amountEl);
console.log(refs.buttonEl);
// --------------------------------------------------
refs.buttonEl.addEventListener('submit', createPromise);

//
function createPromise(position, delay) {
  consttimerId = setInterval(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
    } else {
      // Reject
    }
  }, delay);
}
