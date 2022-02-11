//----Ссылки на элементы
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name=delay]'),
  stepEl: document.querySelector('[name=step]'),
  amountEl: document.querySelector('[name=amount]'),
  buttonEl: document.querySelector('form>button'),
};
// -Взяли значения полей формы:
const delay = Number(refs.formEl.elements.delay.value);
const step = Number(refs.formEl.elements.step.value);
const amount = Number(refs.formEl.elements.amount.value);
console.log(delay);
console.log(step);
console.log(amount);
// ----Функция отправки формы
refs.formEl.addEventListener('submit', createPromise);
// -------------------------------
function createPromise(position, delay) {
  const data = {
    position: position.value,
    delay: delay.value,
  };
  // --ПРОМИС-------------------------
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    // --Функция отложенного вызова - задержка вызова
    setTimeout(() => {
      if (shouldResolve) {
        resolve(data);
      } else {
        reject(data);
      }
    }, delay);
  });
}
// --Обработка промисов
createPromise(data)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
//----Функция колбек для отправки формы
// function createPromise(e) {
//   e.preventDefault();
//   // --Элементы формы выделяем как переменные, чтобы брать их значения
//   const {
//     elements: { delay, step, amount },
//   } = e.target;
//   // ---передаем в setInterval:
//   const interval = Number(delay.value) + Number(step.value);

//   // ---передаем в счетчик:
//   const counterCall = Number(amount.value);
//   // ---Генератор случайного числа:
//   const shouldResolve = Math.random() > 0.3;
//   // -Интервал с частотой вызова промиса
//   setInterval(() => {
//     // -Цикл генераций промисов
//     for (let i = 0; i < counterCall; i += 1) {
//       if (shouldResolve) {
//         // --передаем номер промиса в промис:
//         const position = i + 1;
//         new Promise(() => {
//           console.log(`Fulfilled promise № ${position} in ${interval} ms`);
//         });
//       } else {
//         const position = i + 1;
//         console.log(`Rejected promise № ${position} in ${interval} ms`);
//       }
//     }
//   }, interval);
// }
