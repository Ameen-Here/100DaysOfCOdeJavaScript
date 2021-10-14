"use strict";
console.log(document.querySelector(".message").textContent);

let highScore = 0;
let score = 20;
let number = Math.trunc(Math.random() * 10);

const printNumber = function () {
  let guessValue = Number(document.querySelector(".guess").value);
  console.log(guessValue);

  if (!guessValue) {
    //  When there is no value
    prompt("Enter a number before guessing");
    document.querySelector(".message").textContent =
      "You have not selected any value.";
  } else if (guessValue === number) {
    //  When the user won
    document.querySelector(".message").textContent =
      "You got the correct value.";
    document.querySelector(".number").textContent = guessValue;
    if (score > highScore) {
      document.querySelector(".highscore").textContent = score;
      highScore = score;
    }
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
  } else if (guessValue > number) {
    //  When the value is high
    document.querySelector(".message").textContent =
      "You got the wrong value.It's too high";
    score -= 1;
    document.querySelector(".score").textContent = score;
  } else if (guessValue < number) {
    //  When the value is less
    document.querySelector(".message").textContent =
      "You got the wrong value.It's too low";
    score -= 1;
    document.querySelector(".score").textContent = score;
  } else {
    //  When the user lost
    document.querySelector(".message").textContent = "You loose the game";
    reset();
  }
};

const reset = function () {
  score = 20;
  document.querySelector(".score").textContent = score;
  number = Math.trunc(Math.random() * 10);
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
};

document.querySelector(".again").addEventListener("click", reset);

document.querySelector(".check").addEventListener("click", printNumber);

// also

// document.querySelector(".check").addEventListener("click", function(){
//     console.log(document.querySelector(".guess").value);
// })

