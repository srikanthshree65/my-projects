'use strict';
// let highscoreval = 20
// let score = 20;
// const btnagain = document.querySelector('.again');
const number = document.querySelector('.number');
const guesses = document.querySelector('.guess');
const message = document.querySelector('.message');
const winnigscore = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
let secrateNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
console.log(secrateNumber);
let guess = '';

document.querySelector('.check').addEventListener('click', function () {
  guess = Number(guesses.value);

  if (!guess || guess >= 21 || guess < 0) {
    message.textContent = 'wrong guess';
  } else if (secrateNumber === guess) {
    message.textContent = 'corret answer👍';
    highscore.textContent = score;
    document.querySelector('body').style.backgroundColor = 'green';
    number.textContent = guess;
    number.style.width = '220px';
  } else if (secrateNumber > guess) {
    if (score > 1) {
      message.textContent = 'too low';
      score--;
      winnigscore.textContent = score;
    } else {
      message.textContent = 'lostgame';
      score--;
    }
  } else if (secrateNumber < guess) {
    if (score > 1) {
      message.textContent = 'too high';
      score--;
      winnigscore.textContent = score;
    } else {
      message.textContent = 'lostgame';
      score--;
    }
  }
});
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  winnigscore.textContent = score;
  secrateNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secrateNumber);
  guesses.value = '';
  message.textContent = 'start gussing';
  document.querySelector('body').style.backgroundColor = 'black';
  number.textContent = '?';
  number.style.width = '120px';
});
