"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

// Array Methods
// Slice , SPLICE

const arr = [1, 2, 3, 4, 5];
arr.splice(0, 3); // will start from 0 index and remove , number vales out and mutates splice
console.log(arr);

const arr2 = [1, 2, 3, 4, 5, 6];
arr2.splice(2, 2);
console.log(arr2);

// Reverse

const arrReverse = [5, 4, 3, 2, 1];
arrReverse.reverse(); // MUTATES THE ARRAY
console.log(arrReverse);

// Concat  Doesnt mutate array

const concatArr = arrReverse.concat(arr2);
console.log(concatArr);

// forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements.forEach(function (mov, i, arr) {
  if (mov < 0) console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  else console.log(`Movement ${i + 1}: You deposited ${mov}`);
});

// .at() method
// Similar to arr[] but we can use this for getting last element

console.log(arr2[arr2.length - 1]);
console.log(arr2.at(-1));
console.log(arr2.slice(-1)[0]);

// ALl of the above are for same last value using different ways
// .at() also works in string

// forEach with sets and maps

// Map

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${key}: ${val}`);
});

// Sets

const setCurrencies = new Set(["GBP", "GBP", "EUR", "USD", "USD"]);

setCurrencies.forEach(function (val, _, sets) {
  // _ since there is no key or index for sets
  console.log(`${val}`);
});

// IMPORTANT : WE CANNOT USE BREAK OR CONTINUE IN FOR EACH LOOP!!!
