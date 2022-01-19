'use strict';

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
createBooking('LH123', 6);
createBooking('LH123', undefined, 200);
createBooking('LH123');
console.log(bookings);

const flight = 'LH123';
const jonas = {
  name: 'Jonas S',
  passport: 12333444,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'AM111';
  passenger.name = 'Mr. ' + passenger.name;
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
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstName, ...others] = str.split(' ');
  return [firstName.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  // Higher Order Function
  console.log(`Orginal String is: ${str}`);
  console.log(`Transformed string is: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is great language', upperFirstWord);

console.log('\n');

transformer('Javascript is great language', oneWord);
