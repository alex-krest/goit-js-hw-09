import Notiflix from 'notiflix';
//----Ссылки на элементы
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name=delay]'),
  stepEl: document.querySelector('[name=step]'),
  amountEl: document.querySelector('[name=amount]'),
  buttonEl: document.querySelector('form>button'),
};

refs.formEl.addEventListener('submit', startPromise);

//   ----ФУНКЦИЯ КОЛБЕК ДЛЯ ОТПРАВКИ ФОРМЫ С ЗАПУСКОМ ЦИКЛА ВЫЗОВОВ ПРОМИСОВ
function startPromise(e) {
  e.preventDefault();
  // --элементы формы выделяем как переменные, чтобы брать их значения
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  // -переводим значение в числовой формат
  const firstDelay = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);
  let del = 0;
  // -Цикл генераций промисов c их обработкой
  for (let i = 1; i <= amountValue; i += 1) {
    const position = i;
    if (i === 1) {
      del = firstDelay;
      createPromise(position, del)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    } else {
      del += stepValue;
      createPromise(position, del)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
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
