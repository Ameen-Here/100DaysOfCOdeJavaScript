"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// OLD SCHOOL WAY OF DOING AJAX
const makeACountry = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    let currency = "";

    for (const value of Object.values(data.currencies)) {
      for (const [key1, value1] of Object.entries(value)) {
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
        <article class="country">
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
  });
};

makeACountry("Peru");
makeACountry("India");
makeACountry("saudi arabia");
