"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const getDataURL = function (url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => console.error(err));
  });
};

const renderMap = function (data, className = "") {
  data = data[0];
  if (!data) return;
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

// New way WAY OF DOING AJAX

let promises = [];

const makeACountry = function (country) {
  // First map Render

  getDataURL(`https://restcountries.com/v3.1/name/${country}`)
    .then((data) => {
      if (!data) return;
      renderMap(data);

      // Render neighbour map
      const neighbour = data[0].borders;

      if (!neighbour) {
        throw new Error("No neighbour found");
      }

      for (
        let countrycodeNum = 0;
        countrycodeNum < 3 && countrycodeNum < neighbour.length;
        countrycodeNum++
      ) {
        promises.push(
          getDataURL(
            `https://restcountries.com/v3.1/alpha/${neighbour[countrycodeNum]}`
          )
        );
      }

      Promise.all(promises).then(
        (datas) => {
          for (let data of datas) {
            renderMap(data, "neighbour");
          }
        },
        (err) => console.error(err)
      );
    })
    .catch((err) => console.error(err));
};


const getJSON = function (
  url,
  errorMessage = "More than 3 request per second!!!!"
) {
  return fetch(url).then((response) => {
    if (response.status === 403) {
      throw new Error(`${errorMessage}, ${response.status}`);
    }
    return response.json();
  });
};

const whereAmI = function (lat, lng) {
  let country = "";
  getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((data) => {
      if (!data.country && !data.state) {
        throw new Error("The latitude(or)longitude is incorrect");
      }
      console.log(`You are in ${data.state}, ${data.country}`);
      return data.country;
    })
    .then((country) => makeACountry(country))
    .catch((err) => alert(err));
};

whereAmI(52.508, 13.381);

