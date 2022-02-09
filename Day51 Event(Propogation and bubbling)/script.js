"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Scrolling

const scrollBtn = document.querySelector(".btn--scroll-to");

const section1 = document.getElementById("section--1");

scrollBtn.addEventListener("click", function (e) {
  // OLD SCHOOL WAY

  // const s1cords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1cords.left,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Modern way

  section1.scrollIntoView({ behavior: "smooth" });
});

// Creating a cookie message
// Creating a dom element

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics";

message.innerHTML =
  'We use cookies for improved functionality and analytics<button class="btn btn--close-cookie">Got it!</button>';

// Inserting the message DOM element

const header = document.querySelector(".header");
header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove(); // Earlier it was    message.parentElement.removeChild(message)
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lectures

// Different types of event and event handling

const h1 = document.querySelector("h1");
h1.addEventListener("mouseenter", function (e) {
  alert("Header clicked");
});

// Also the old school way

// h1.onmouseenter = function (e) {
//   alert("Header clicked");
// };

//  Removing event listener after certain time.

//  We need naming function for that

const h1Alert = function (e) {
  alert("removing hello after 10 second");

  // Also can add here too
  // to stop it after one use
  h1.removeEventListener("mouseenter", h1Alert);
};

h1.addEventListener("mouseenter", h1Alert);

setTimeout(() => {
  h1.removeEventListener("mouseenter", h1Alert);
}, 10000);

// Bubbling and capturing example

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log("links");
  if (e.target === this) this.style.backgroundColor = randomColor();
  // e.stopPropagation(); ?? alt
});

document.querySelector(".nav").addEventListener("click", function (e) {
  console.log("nav");
});
