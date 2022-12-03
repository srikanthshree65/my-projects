'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const brnshow = document.querySelectorAll('.show-modal ');
const showmode = function () {
  console.log('button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const removemode = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < brnshow.length; i++)
  brnshow[i].addEventListener('click', showmode);
btnClose.addEventListener('click', removemode);
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      removemode();
    }
  }
});
