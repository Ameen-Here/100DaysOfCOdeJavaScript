'use strict';

// Selecting elements
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1'); //document.querySelector('#score--0'); but the other oneis faster

let player0BgColor = document.querySelector('.player--0');
let player1BgColor = document.querySelector('.player--1');

let diceEl = document.querySelector('.dice');
let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');

let diceRollBtnEl = document.querySelector('.btn--roll');
let holdBtnEl = document.querySelector('.btn--hold');
let newGameBtnEl = document.querySelector('.btn--new');

let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  activePlayer = Math.abs(activePlayer * 1 - 1);
  player0BgColor.classList.toggle('player--active');
  player1BgColor.classList.toggle('player--active');
};

const scoreDisplay = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const resetGame = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  playing = true;
  document.querySelector;
  currentScore = 0;
  totalScores = [0, 0];
  for (let i = 0; i < 2; i++) {
    activePlayer = i;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    scoreDisplay();
    switchPlayer();
  }
};

diceRollBtnEl.addEventListener('click', function () {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      scoreDisplay();
    } else {
      currentScore = 0;
      scoreDisplay();
      switchPlayer();
    }
  }
});

holdBtnEl.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    if (totalScores[0] > 100 || totalScores[1] > 100) {
      playing = false;
      //   document
      //     .querySelector(`player--${activePlayer}`)
      //     .classList.remove('player--active');
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      currentScore = 0;
      scoreDisplay();
      switchPlayer();
    }
  }
});

newGameBtnEl.addEventListener('click', resetGame);
