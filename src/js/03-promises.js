//----Ссылки на элементы
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name=delay]'),
  stepEl: document.querySelector('[name=step]'),
  amountEl: document.querySelector('[name=amount]'),
  buttonEl: document.querySelector('form>button'),
};
// -Взяли значения полей формы:
// const delay = Number(refs.formEl.elements.delay.value);
// const step = Number(refs.formEl.elements.step.value);
// const amount = Number(refs.formEl.elements.amount.value);
// console.log(delay);
// console.log(step);
// console.log(amount);
// ----ОТПРАВКА ФОРМЫ
refs.formEl.addEventListener('submit', startPromise);

//   ----ФУНКЦИЯ КОЛБЕК ДЛЯ ОТПРАВКИ ФОРМЫ С ЗАПУСКОМ ЦИКЛА ВЫЗОВОВ ПРОМИСОВ
function startPromise(e) {
  e.preventDefault();
  // --элементы формы выделяем как переменные, чтобы брать их значения
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  console.log(delay.value);
  console.log(step.value);
  console.log(amount.value);
  // -Цикл генераций промисов c их обработкой
  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    if (i > 1) {
      delay = step.value;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

// --ФУНКЦИЯ ЗАПУСКА ОДНОГО ПРОМИСА
const createPromise = (position, delay) => {
  //--генератор случайного числа:
  const shouldResolve = Math.random() > 0.3;
  // --промис-------------------------
  return new Promise((resolve, reject) => {
    // --функция отложенного вызова - задержка вызова
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
