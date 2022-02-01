"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [
    [200, "2019-11-18T21:31:17.178Z"],
    [455.23, "2019-12-23T07:42:02.383Z"],
    [-306.5, "2020-01-28T09:15:04.904Z"],
    [25000, "2020-04-01T10:17:24.185Z"],
    [-642.21, "2020-05-08T14:11:59.604Z"],
    [-133.9, "2020-05-27T17:01:17.194Z"],
    [79.97, "2020-07-11T23:36:17.929Z"],
    [1300, "2020-07-12T10:51:36.790Z"],
  ],
  interestRate: 1.2, // %
  pin: 1111,

  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [
    [5000, "2019-11-01T13:15:33.035Z"],
    [3400, "2019-11-30T09:48:16.867Z"],
    [-150, "2019-12-25T06:04:23.907Z"],
    [-790, "2020-01-25T14:18:46.235Z"],
    [-3210, "2020-02-05T16:33:06.386Z"],
    [-1000, "2020-04-10T14:43:26.374Z"],
    [8500, "2020-06-25T18:49:59.371Z"],
    [-30, "2020-07-26T12:01:20.894Z"],
  ],
  interestRate: 1.5,
  pin: 2222,

  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions
// Creating usernames

function createUsername(accs) {
  return accs.forEach(
    (acc) =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join(""))
  );
}

createUsername(accounts);

// Log Out function

const logOut = function () {
  containerApp.style.transition = "all 0s";

  containerApp.style.opacity = 0;
};

// Log in function

const logIn = function () {
  containerApp.style.transition = "all 3s";
  const currentDate = new Date();
  // labelDate.textContent = currentDate;
  // for making it day/month/year
  const day = `${currentDate.getDate()}`.padStart(2, 0);
  const month = `${currentDate.getMonth() + 1}`.padStart(2, 0);
  const year = currentDate.getFullYear();
  const hour = `${currentDate.getHours()}`.padStart(2, 0);
  const minutes = `${currentDate.getMinutes()}`.padStart(2, 0);

  labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;
  containerApp.style.opacity = 100;
};

// For Updating balance

function calcPrintBalance(acc) {
  const movs = acc.movements.map((mov) => mov[0]);
  const income = movs
    .filter((mov) => mov > 0)
    .reduce((acu, mov) => acu + mov, 0);

  const outflow = movs
    .filter((mov) => mov <= 0)
    .reduce((acu, mov) => acu + mov, 0);

  const interest = movs
    .filter((mov) => mov > 0)
    .reduce(
      (acu, mov) =>
        mov * 0.012 >= 1 ? acu + mov * (acc.interestRate / 100) : acu + 0,
      0
    ); // OR const interest = movs.filter((mov) => mov > 0) .map((mov) => mov * 0.012).reduce((acu, mov) => acu + mov, 0)

  acc.balance = movs.reduce((acc, val) => acc + val, 0);

  labelSumOut.textContent = `${Math.abs(outflow).toFixed(2)} €`;

  labelSumIn.textContent = `${income.toFixed(2)} €`;

  labelSumInterest.textContent = `${interest.toFixed(2)} €`;

  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
}

// Start of functions and other important DOM manipulation

// To show the movements take place in the account

const movementFun = function (accountt, sort = false) {
  const movements = accountt.movements;
  containerMovements.innerHTML = "";
  // let move = movements;
  // if (sort) move.sort((a, b) => a - b);
  // Bring top 2 , together
  const move = sort ? movements.slice().sort((a, b) => a[0] - b[0]) : movements;
  move.forEach(function (mov, i) {
    const type = mov[0] > 0 ? "deposit" : "withdrawal";

    const currentDate = new Date(`${mov[1]}`);
    const day = `${currentDate.getDate()}`.padStart(2, 0);
    const month = `${currentDate.getMonth() + 1}`.padStart(2, 0);
    const year = currentDate.getFullYear();

    const displaydate = `${day} / ${month} / ${year}`;
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__date">${displaydate}</div>
          <div class="movements__value">
            ${mov[0].toFixed(2)}
          </div>
        </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
  // console.log(containerMovements.innerHTML);
};
// Update UI function

const updateUI = function (acc) {
  // updating The Movement
  movementFun(acc);

  // Display SUmmary and Balance
  calcPrintBalance(acc);
};

// Date

//  Accepting Login Values and checking the password and username and updating the UI

btnLogin.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from submitting
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Displauy the Ui and welcome message ,
    labelWelcome.textContent = `Welcome Back,  ${
      currentAccount.owner.split(" ")[0]
    }`;

    logIn();

    // Clear the input fileds
    inputLoginPin.value = inputLoginUsername.value = "";

    // to remove the cursor from input user and pin
    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUI(currentAccount);
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Login to get started";
  }

  console.log(currentAccount);
});

// Implementing Transfer:

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const recieverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAccount);
  // Clear the input fileds
  inputTransferTo.value = inputTransferAmount.value = "";

  // to remove the cursor from input reciever acc and amount
  inputTransferAmount.blur();
  inputTransferTo.blur();
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    recieverAccount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    // recieverAccount.movements[recieverAccount.movements.length] = amount;
    console.log("Transfer Valid");
    currentAccount.movements.push([-amount, new Date().toISOString()]);
    updateUI(currentAccount);
    recieverAccount.movements.push([amount, new Date().toISOString()]);
  }
});

// Close account

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  // Checking the credentials

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    // Using splice method to delete this account
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    logOut();
  }

  inputClosePin.value = inputCloseUsername.value = "";
});

// Requesting loan functionality

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const laonAmount = Math.trunc(inputLoanAmount.value);
  if (
    laonAmount > 0 &&
    currentAccount.movements.some((mov) => mov[0] >= laonAmount * 0.1)
  ) {
    // Adding loan movement

    currentAccount.movements.push([laonAmount, new Date().toISOString()]);
    console.log(currentAccount);

    // Updating UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

// Sortbutton functionality
let conditionSort = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  movementFun(currentAccount.movements, !conditionSort);
  conditionSort = !conditionSort;
});

// Fake Always logged in

let currentAccount;
currentAccount = account1;
updateUI(currentAccount);
logIn();

/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(23 === 23.0);

//  Parsing
console.log(Number.parseInt("s23px4"));

//  COnverting string to number

console.log(Number("23")); // Normal way

console.log(+"23"); // Much better way, using type coercing

console.log(Number.isInteger(23.5));

// Creating a random number giving function

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min)) + min; // Min  will not be included

console.log(randomInt(0, 3));

//  isEven Function

const isEven = (num) => num % 2 === 0;

//

// labelBalance.addEventListener("click", function () {
//   [...document.querySelectorAll(".movements__row")].forEach((row, index) => {
//     if (index % 2 === 0) row.style.backgroundColor = "orangered";
//   });
// });

// Bigint
const biggg = 12467894345354657345647658767546547678n;
console.log(biggg);
console.log(biggg * 10n);
console.log(biggg + " is very big number");

// DATES

//  Creating Dates
//  1
const now = new Date();
console.log(now);

//  2
console.log(new Date("Feb 01 2022 16:14:51"));

// Time stamp
const nowtimeStamp = Date.now();
console.log(nowtimeStamp);

//  Month are only zero based , 0 means jan

//  Also day is zero based, where 0 is sunday

// can get all this using .getMonths, .getDates, etc... Only for year .getFullYear

// you can year month etc by .setYear , etc
