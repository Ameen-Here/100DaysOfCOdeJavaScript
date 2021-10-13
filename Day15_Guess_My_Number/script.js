"use strict";
console.log(document.querySelector(".message").textContent);

let highScore = 0;
let score = 20;
let number = Math.trunc(Math.random() * 10);

const printNumber = function () {
  let guessValue = Number(document.querySelector(".guess").value);
  console.log(guessValue);

  if (!guessValue) {
    prompt("Enter a number before guessing");
    document.querySelector(".message").textContent =
      "You have not selected any value.";
  } else if (guessValue === number) {
    document.querySelector(".message").textContent =
      "You got the correct value.";
    document.querySelector(".number").textContent = guessValue;
    document.querySelector(".highscore").textContent = score;
  } else if (guessValue > number) {
    document.querySelector(".message").textContent =
      "You got the wrong value.It's too high";
    score -= 1;
    document.querySelector(".score").textContent = score;
  } else if (guessValue < number) {
    document.querySelector(".message").textContent =
      "You got the wrong value.It's too low";
    score -= 1;
    document.querySelector(".score").textContent = score;
  } else {
    document.querySelector(".message").textContent = "You loose the game";
    reset();
  }
};

const reset = function () {
  score = 20;
  document.querySelector(".score").textContent = score;
  number = Math.trunc(Math.random() * 10);
};

document.querySelector(".again").addEventListener("click", reset);

document.querySelector(".check").addEventListener("click", printNumber);

// also

// document.querySelector(".check").addEventListener("click", function(){
//     console.log(document.querySelector(".guess").value);
// })
