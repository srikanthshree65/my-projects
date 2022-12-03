'use strict';
const dice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const playername0 = document.querySelector('#name--0');
const playername1 = document.querySelector('#name--1');
const player0score = document.querySelector('#score--0');
const player1score = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentscore0 = document.querySelector('#current--0');
const currentscore1 = document.querySelector('#current--1');
let currentscore = [0, 0];
let currentplayer = 0;
let curret = 0;
let playing = true;
let newscore;
dice.classList.add('hidden');
const swichplayer = function () {
  document.getElementById(`current--${currentplayer}`).textContent = curret;
  curret = 0;
  currentplayer = currentplayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
btnroll.addEventListener('click', function () {
  if (playing) {
    const newscore = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${newscore}.png`;
    if (newscore !== 1) {
      curret = curret + newscore;
      document.getElementById(`current--${currentplayer}`).textContent = curret;
    } else swichplayer();
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    currentscore[currentplayer] += curret;
    document.getElementById(`score--${currentplayer}`).textContent =
      currentscore[currentplayer];
    if (currentscore[currentplayer] >= 40) {
      dice.classList.add('hidden');
      playing = false;

      document
        .querySelector(`.player--${currentplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentplayer}`)
        .classList.add('player--active');
    } else swichplayer();
  }
});
btnNew.addEventListener('click', function () {
  playing = true;
  player0score.textContent = 0;
  player1score.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  let currentscore = [0, 0];
  let currentplayer = 0;
  let curret = 0;
  let newscore = 0;
});
