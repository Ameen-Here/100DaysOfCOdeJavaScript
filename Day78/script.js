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

// // New way WAY OF DOING AJAX

let promises = [];

const makeACountry = function (country) {
  // First map Render

  getDataURL(`https://restcountries.com/v3.1/name/${country}`).then((data) => {
    if (!data) return;
    renderMap(data);
  });
  // Render neighbour map
  // const neighbour = data[0].borders;

  // if (!neighbour) {
  //   throw new Error("No neighbour found");
  // }

  // for (
  //   let countrycodeNum = 0;
  //   countrycodeNum < 3 && countrycodeNum < neighbour.length;
  //   countrycodeNum++
  // ) {
  //   promises.push(
  //     getDataURL(
  //       `https://restcountries.com/v3.1/alpha/${neighbour[countrycodeNum]}`
  //     )
  //   );
  // }

  //   Promise.all(promises).then(
  //     (datas) => {
  //       for (let data of datas) {
  //         renderMap(data, "neighbour");
  //       }
  //     },
  //     (err) => console.error(err)
  //   );
  // })
  // .catch((err) => console.error(err));
};

// // btn.addEventListener("click", function () {
// //   const countryName = prompt("Enter the country?");
// // });

// /////////////////////////////////////////
// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
// The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// GOOD LUCK 😀
// */

// const getJSON = function (
//   url,
//   errorMessage = "More than 3 request per second!!!!"
// ) {
//   return fetch(url).then((response) => {
//     if (response.status === 403) {
//       throw new Error(`${errorMessage}, ${response.status}`);
//     }
//     return response.json();
//   });
// };

// const whereAmI = function (lat, lng) {
//   let country = "";
//   getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((data) => {
//       if (!data.country && !data.state) {
//         throw new Error("The latitude(or)longitude is incorrect");
//       }
//       console.log(`You are in ${data.state}, ${data.country}`);
//       return data.country;
//     })
//     .then((country) => makeACountry(country))
//     .catch((err) => alert(err));
// };

// whereAmI(52.508, 13.381);

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("lottery draw is happening");
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve("You won!");
//     } else {
//       reject(new Error("You lost"));
//     }
//   }, 2000);
// });

// console.log("Lotteryyyyy");
// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));
// console.log("Helloo");
// console.log("Hellooooooo");

// const wait = function (seconds) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log("1 second passed.");
//     return wait(2);
//   })
//   .then(() => {
//     console.log("2 second passed,");
//     return wait(3);
//   })
//   .then(() => {
//     console.log("3 second passed.");
//     return wait(4);
//   })
//   .then(() => {
//     console.log("4 second passed.");
//     return wait(5);
//   })
//   .then(() => {
//     console.log("5 second passed.");
//   });

// To Escape callback hell and also it helps prioritise these calls.
// setTimeout(() => {
//   console.log("1 second passed");
//   setTimeout(() => {
//     console.log("2 second passed");
//     setTimeout(() => {
//       console.log("3 seconds passed");
//       setTimeout(() => {
//         console.log("4 seconds passed");
//         setTimeout(() => {
//           console.log("5 seconds passed");
//         }, 5000);
//       }, 4000);
//     }, 3000);
//   }, 2000);
// }, 1000);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then((res) => console.log(res));

// const whereAmI = function () {
//   getPosition()
//     .then((pos) => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       let country = "";
//       return getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then((data) => {
//       if (!data.country && !data.state) {
//         throw new Error("The latitude(or)longitude is incorrect");
//       }
//       console.log(`You are in ${data.state}, ${data.country}`);
//       return data.country;
//     })
//     .then((country) => makeACountry(country))
//     .catch((err) => alert(err));
// };

// WhereAmI function using async await

// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     console.log(pos);
//     const { latitude: lat, longitude: lng } = pos.coords;

//     const res = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

//     console.log(res);

//     const resData = await res.json();

//     if (resData.error) throw new Error("Erro getting country");
//     console.log(resData);

//     makeACountry(resData.country);
//   } catch (err) {
//     alert(err);
//   }
// };

// whereAmI();

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

// let currentImg;

// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((err) => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
// .then(() => {
//   currentImg.style.display = 'none';
//   return createImage('img/img-2.jpg');
// })
// .then(img => {
//   currentImg = img;
//   console.log('Image 2 loaded');
//   return wait(2);
// })
// .then(() => {
//   currentImg.style.display = 'none';
// })
// .catch(err => console.error(err));

// PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage("img/img-1.jpg");
    console.log("Image 1 loaded");
    await wait(2);
    img.style.display = "none";

    // Load image 1
    img = await createImage("img/img-2.jpg");
    console.log("Image 2 loaded");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);

// loadNPause();
