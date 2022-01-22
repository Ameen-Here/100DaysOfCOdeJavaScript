"use strict";

// Default Parameters

const bookings = [];

const createBooking = function (flightNum, numPass = 1, price = 199 * numPass) {
  const booking = {
    flightNum,
    numPass,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking("LH123", 6);
createBooking("LH123", undefined, 200);
createBooking("LH123");
console.log(bookings);

const flight = "LH123";
const jonas = {
  name: "Jonas S",
  passport: 12333444,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "AM111";
  passenger.name = "Mr. " + passenger.name;
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// First Class Function and Higher Order Function

const add = (a, b) => console.log(a + b);

add(2, 3);

// Functions accepting Callback Fuctions

const oneWord = function (str) {
  // return str.replaceAll(' ', '').toLowerCase();
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstName, ...others] = str.split(" ");
  return [firstName.toUpperCase(), ...others].join(" ");
};

const transformer = function (str, fn) {
  // Higher Order Function
  console.log(`Orginal String is: ${str}`);
  console.log(`Transformed string is: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("Javascript is great language", upperFirstWord);

console.log("\n");

transformer("Javascript is great language", oneWord);

// Functions returning functions

// const greeting = function (nameOff) {
//   console.log(`${great}....${nameOff}`);
// };

const greet = function (great) {
  return function (name) {
    console.log(`${great}....${name}`);
  };
};

const example = greet("Hey");
example("John");

// Using arrow function

const greetArr1 = function (great) {
  return (name) => console.log(`${great}....${name}`);
};

const example1 = greetArr1("Hey");
example1("John");

// Or (Using arrow function)

const greetArr2 = (greeting) => (name) => console.log(`${greeting}....${name}`);
const example2 = greetArr2("Hey");
example2("John");

// Also

greet("poda")("idk");

greetArr2("Hello")("Jonas");

// Call and Apply Method (This keyword uses)

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({
      flight: `${this.airline} flight ${this.iataCode} ${flightNum}`,
      name,
    });
  },
};

lufthansa.book("1233333", "John");
console.log(lufthansa);

// We can take booking this thing as an external function, so that we can use it anywhere.

const book = lufthansa.book;

// book(23,"Ameen")
// Does not work

// Call method

book.call(lufthansa, 23, "Ameen"); // This will work

// The use is , now we can create multiple object and can use lufthansa book function for them
// For example

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

// Here is how we do that

book.call(eurowings, 23, "Ameen"); // Done

console.log(eurowings);

// APply method

const airlineData = [23, "John"];
book.apply(eurowings, airlineData);

// Not used anymore, but use call method and use spread operator

book.call(eurowings, ...airlineData);
console.log(eurowings);

// The Bind Method
const bookEW = book.bind(eurowings);
bookEW(233, "AMeen Noushad");

// Partial Applicatio
const bookEW612 = book.bind(eurowings, 612);
bookEW612("Manher Noushad");

console.log(eurowings);

// More usage
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const add23Tax = addTax.bind(null, 0.23);
console.log(add23Tax(200));
//  Using arrow function

const addTaxRate = (rate) => (value) => console.log(value + value * rate);

const addVatRate = addTaxRate(0.23);
addVatRate(460);

//  Coding Exercise

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  validAnswer: [0, 1, 2, 3],
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    // console.log(typeof answer);
    answer in this.validAnswer
      ? this.answers[answer]++
      : console.log("Invalid option"); // without validAnswer  : answer === Number && answer < this.answers.length && answer >= 0 && this.amswers(answer)++
    this.displayResults();
    this.displayResults("String");
  },
  displayResults(type = Array) {
    type === Array
      ? console.log(this.answers)
      : console.log(`Poll results are ${this.answers.join(", ")}`);
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

// Immediately invoked function expression
(function () {
  console.log("This will not work again");
})();

// With arrow function

(() => console.log("This will also not work again"))();
