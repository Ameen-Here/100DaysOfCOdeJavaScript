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
