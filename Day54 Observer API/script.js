"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const scrollBtn = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////////////////////////////////

// Scrolling

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

///////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////
// Page Navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     // const id = this.getAttribute("href");
//     document.querySelector(this.getAttribute("href")).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

//  THe above navigation will cause multiple copies of the same event handlers, the better way is to make one event delegation by making this in one of the common parent, so only one copy is needed

// Event Delegation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link"))
    document.querySelector(e.target.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
});

/////////////////////////////////////////////

// Tabbed Components

// event delegation

tabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  // Gaurd Clause

  if (!clicked) return;

  // Removing active tab

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  // Activating the clicked tab
  clicked.classList.add("operations__tab--active");

  // Active Content area

  tabContents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  // console.log(clicked.dataset.tab);

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/////////////////////////////////////////////

//  Menu Fading Animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    link
      .closest(".nav")
      .querySelectorAll(".nav__link")
      .forEach((el) => (el.style.opacity = this));

    link.closest(".nav").querySelector("img").style.opacity = this;

    console.log(typeof this);
    console.log(this < 0);
    if (this < 1) link.style.opacity = 1;

    // link.style.opacity = 1.5;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky Navigation (Old School)  USING SCROLL EVENT IS BAD FOR PERFORMANCE

// const initialCOords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCOords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// Using Observer API
// Example of using observer API
// const obsCallback = function (entries, Observer) {
//   entries.forEach((entry) => console.log(entry));
// };

// const obsOption = {
//   threshold: [0, 0.2],
//   root: null,
// };

// const Observer = new IntersectionObserver(obsCallback, obsOption);

// Observer.observe(section1);

// Now APplying for sticky nav

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
