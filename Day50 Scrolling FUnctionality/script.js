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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Lectures

// Creating a dom element

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics";

message.innerHTML =
  'We use cookies for improved functionality and analytics<button class="btn btn--close-cookie">Got it!</button>';

// Inserting the message DOM element

const header = document.querySelector(".header");
header.prepend(message);
header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove(); // Earlier it was    message.parentElement.removeChild(message)
  });
