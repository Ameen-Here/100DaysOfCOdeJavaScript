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

// Start of functions and other important DOM manipulation

// To show the movements take place in the account
const movementFun = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__value">
            ${mov}
          </div>
        </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
  // console.log(containerMovements.innerHTML);
};

movementFun(account1.movements);

// For Updating balance

function calcPrintBalance(movs) {
  const income = movs
    .filter((mov) => mov > 0)
    .reduce((acu, mov) => acu + mov, 0);

  const outflow = movs
    .filter((mov) => mov <= 0)
    .reduce((acu, mov) => acu + mov, 0);

  const interest = movs
    .filter((mov) => mov > 0)
    .reduce((acu, mov) => (mov * 0.012 >= 1 ? acu + mov * 0.012 : acu + 0), 0); // OR const interest = movs.filter((mov) => mov > 0) .map((mov) => mov * 0.012).reduce((acu, mov) => acu + mov, 0)

  const balance = movs.reduce((acc, val) => acc + val, 0);

  labelSumOut.textContent = `${Math.abs(outflow)} €`;

  labelSumIn.textContent = `${income} €`;

  labelSumInterest.textContent = `${interest} €`;

  labelBalance.textContent = `${balance} €`;
}

calcPrintBalance(account1.movements);

//  Creating Username
function createUsername(accs) {
  return accs.forEach(
    (acc) =>
      (acc.createUsername = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join(""))
  );
}

console.log(accounts);
// const createUsername = function (accs) {
//   accs.forEach(function (acc) {
//     acc.userName = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };     THIS IS WITHOUT ARROW FUNCTON

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

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = (dogsJulia, dogsKate) => {
  const dogJuliaCopy = dogsJulia.slice();
  dogJuliaCopy.splice(0, 1);
  dogJuliaCopy.splice(-2);
  console.log(dogJuliaCopy); // Or const dogJuliaCopy = dogsJulia.slice(1,3);
  const dogs = dogJuliaCopy.concat(dogsKate);
  dogs.forEach(function (dog, ind) {
    dog > 3
      ? console.log(`Dog number ${ind} is an adult, and is ${dog} years old`)
      : console.log(`Dog number ${ind} is still a puppy 🐶`);
  });
};

const dogJulia1 = [3, 5, 2, 12, 7];
const dogkate1 = [4, 1, 15, 8, 3];
const dogJulia2 = [9, 16, 6, 8, 3];
const dogkate2 = [10, 5, 6, 1, 4];
console.log(typeof checkDogs);

console.log("Test Case 1");
checkDogs(dogJulia1, dogkate1);

console.log("test case 2");
checkDogs(dogJulia2, dogkate2);

// Coding Challenge 1 DONE

// The Map Method
const euros = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementUsd = euros.map(function (euro) {
  return euro * eurToUsd;
});

console.log(movementUsd);

console.log(
  euros.map(function (euro) {
    return 2 * euro;
  })
);

// Arrow FUnction
const movementUsd1 = euros.map((euro) => euro * eurToUsd);

console.log(movementUsd1);

// Using value, index and whole array inside map.
const movementArr = movements.map(
  (mov, ind) =>
    `Movement ${ind + 1}: You  ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);

console.log(movementArr);

// movements.forEach(function (mov, i, arr) {
//   if (mov < 0) console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   else console.log(`Movement ${i + 1}: You deposited ${mov}`);
// });

// Side Effects
// The Key Method

// The Filter Method

// The Reduce Method

const movementAcc = movements.reduce(function (acc, val) {
  console.log(acc);
  console.log("accumulator + val");
  console.log(acc + val);
  return acc + val;
}, 0);
console.log(movementAcc);

// By using arrow function

console.log("Using Arrow Function");
const globalTotal = movements.reduce((acc, val) => acc + val, 0);
console.log(globalTotal);

// Reduce (Maximum value)

const maxAcc = movements.reduce((acc, val) => (acc > val ? acc : val), 0);
console.log(maxAcc);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function calcAverageHumanAge(ages) {
  const humanAge = ages.map((age) => (age > 2 ? 16 + age * 4 : 2 * age));
  const humanAge18 = humanAge.filter((age) => age >= 18);
  const averageHumanAge =
    humanAge18.reduce((acc, age) => acc + age, 0) / humanAge18.length;
  console.log(humanAge);
  console.log(humanAge18);
  return averageHumanAge;
}

const arrrraayyy = [5, 2, 4, 1, 15, 8, 3];
const averageOfArrayyyy = calcAverageHumanAge(arrrraayyy);
console.log("Not Improved");
console.log(averageOfArrayyyy);

/////  Magic of chaining methods

const totalDepositInUs = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acu, mov) => acu + mov, 0);
console.log(`${totalDepositInUs}$`);

// Just calculating average human age

function calcAverageHumanAgeImproved(ages) {
  return ages
    .map((age) => (age > 2 ? 16 + age * 4 : 2 * age))
    .filter((age18) => age18 >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
}

console.log("Improved");
const averageImp = calcAverageHumanAgeImproved(arrrraayyy);
console.log(averageImp);
