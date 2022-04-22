"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderMap = function (data, className = "") {
  let currency = "";

  for (const key of Object.values(data.currencies)) {
    for (const [key1, value1] of Object.entries(key)) {
      if (key1 === "name") {
        currency = value1;
      }
    }
  }

  let language = "";

  let counter = 1;
  for (const value of Object.values(data.languages)) {
    language += counter + ". " + value + " ";
    counter++;
  }

  const html = `
        <article class="country ${className}">
                <img class="country__img" src="${data.flags.svg}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name.common}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(
                      +data.population / 1000000
                    ).toFixed(1)} million people</p>
                    <p class="country__row"><span>🗣️</span>${language}</p>
                    <p class="country__row"><span>💰</span>${currency}</p>
                </div>
                </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// OLD SCHOOL WAY OF DOING AJAX
const makeACountry = function (country) {
  // First map Render
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderMap(data);

    const neighbour = data.borders;

    if (!neighbour) return;

    for (
      let countrycodeNum = 0;
      countrycodeNum < 3 && countrycodeNum < neighbour.length;
      countrycodeNum++
    ) {
      // Neighbour map render

      const request2 = new XMLHttpRequest();
      request2.open(
        "GET",
        `https://restcountries.com/v3.1/alpha/${neighbour[countrycodeNum]}`
      );
      request2.send();

      request2.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        renderMap(data, "neighbour");
      });
    }
  });
};

makeACountry("USA");
