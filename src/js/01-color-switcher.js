const refs = {
  bodyEl: document.querySelector('body'),
  startEl: document.querySelector('button[data-start]'),
  stopEl: document.querySelector('button[data-stop]'),
};
// --------------------------------------------------
console.log(refs.bodyEl);
console.log(refs.startEl);
console.log(refs.stopEl);
// ---------------------------------------------------

refs.startEl.addEventListener('click', () => {
  timerId = setInterval(() => {
    changeOfColor();
  }, 1000);
});

function changeOfColor(e) {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
  refs.startEl.disabled = true;
}

const getRandomHexColor = function () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

refs.stopEl.addEventListener('click', stopChangeOfColor);
function stopChangeOfColor() {
  clearInterval(timerId);
  refs.startEl.disabled = false;
}
