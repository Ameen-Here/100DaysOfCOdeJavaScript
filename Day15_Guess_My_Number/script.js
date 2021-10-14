"use strict";
console.log(document.querySelector(".message").textContent);

let highScore = 0;
let score = 20;
let number = Math.trunc(Math.random() * 10);

const message = function (class_name, value) {
  document.querySelector(`${class_name}`).textContent = value;
};

const printNumber = function () {
  let guessValue = Number(document.querySelector(".guess").value);
  console.log(guessValue);

  if (score < 1) {
    //  When the user lost
    message(".message", "You loose the game");
    reset();
  }

  if (!guessValue) {
    //  When there is no value
    message(".message", "You have not selected any value.");
  } else if (guessValue === number) {
    //  When the user won
    message(".message", "You got the correct value.");
    document.querySelector(".number").textContent = guessValue;
    if (score > highScore) {
      document.querySelector(".highscore").textContent = score;
      highScore = score;
    }
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
  } else if (guessValue !== number) {
    score -= 1;
    //  Checking if it's too low or too high
    guessValue < number
      ? message(".message", "It's too low")
      : message(".message", "It's too high");
  }
};

const reset = function () {
  score = 20;
  document.querySelector(".score").textContent = score;
  number = Math.trunc(Math.random() * 10);
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  message(".number", "?");
};

document.querySelector(".again").addEventListener("click", reset);

document.querySelector(".check").addEventListener("click", printNumber);
