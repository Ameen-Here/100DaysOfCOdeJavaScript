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

//  Creating Username

// const createUsername = function (accs) {
//   accs.forEach(function (acc) {
//     acc.userName = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };     THIS IS WITHOUT ARROW FUNCTON

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

// For Updating balance

function calcPrintBalance(acc) {
  const movs = acc.movements;
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

  labelSumOut.textContent = `${Math.abs(outflow)} €`;

  labelSumIn.textContent = `${income} €`;

  labelSumInterest.textContent = `${interest} €`;

  labelBalance.textContent = `${acc.balance} €`;
}

// Start of functions and other important DOM manipulation

// To show the movements take place in the account
const movementFun = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  // let move = movements;
  // if (sort) move.sort((a, b) => a - b);
  // Bring top 2 , together
  const move = sort ? movements.slice(0).sort((a, b) => a - b) : movements;
  move.forEach(function (mov, i) {
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
// Update UI function

const updateUI = function (acc) {
  // updating The Movement
  movementFun(acc.movements);

  // Display SUmmary and Balance
  calcPrintBalance(acc);
};

// Log Out function

const logOut = function () {
  containerApp.style.transition = "all 0s";
  containerApp.style.opacity = 0;
};

// Log in function

const logIn = function () {
  containerApp.style.transition = "all 3s";
  containerApp.style.opacity = 100;
};

//  Accepting Login Values and checking the password and username and updating the UI

let currentAccount;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from submitting
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
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
  const amount = Number(inputTransferAmount.value);
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
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
    recieverAccount.movements.push(amount);
  }
});

// Close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  // Checking the credentials

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
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
  const laonAmount = Number(inputLoanAmount.value);
  if (
    laonAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= laonAmount * 0.1)
  ) {
    // Adding loan movement

    currentAccount.movements.push(laonAmount);

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

// Some Method  Gives true if any one element passes the condition
console.log(movements.some((mov) => mov > 0));

// Every Method   Gives true if every element passes the condition
console.log(movements.every((mov) => mov > 0));

// Seperate call back  (Better dry principle)

const deposit = (mov) => mov > 0;

console.log(movements.some(deposit));
console.log(movements.filter(deposit));

// Flat and flat map

// const arr1 = [[1, 2, 3], 4, 5, 6];
// console.log(arr1.flat());

const accountMovements = accounts.map((acc) => acc.movements);

const allAccountMovements = accountMovements.flat();
console.log(allAccountMovements);

const overallBalance = allAccountMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// Overall balance using chaining

const imprOverallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acu, mov) => acu + mov, 0);

console.log(imprOverallBalance);

// Using flat map

const imprOverallBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acu, mov) => acu + mov);

console.log(`Using flat map ${imprOverallBalance2}`);

// Sorting numbers
// returns anything > 0, if a > b (switch order returns > 0)
// returns anything < 0 if b > a

// let aa = 0;
const movementsCopy = movements.slice(0);
movementsCopy.sort((a, b) => {
  // console.log(++aa);
  if (a < b) return -1;
  return 1;
});
console.log(`${movements} \n ${movementsCopy}`);

const imprMovementsCopy = movements.slice(0);
const imprMovementsCopyDes = movements.slice(0);

imprMovementsCopy.sort((a, b) => a - b);
imprMovementsCopyDes.sort((a, b) => b - a);

console.log(`${imprMovementsCopy} \n ${imprMovementsCopyDes}`);

// Random Dice roll 100

const randomDiceRolls = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);

console.log(randomDiceRolls);

// getting balance values from balance label click
labelBalance.addEventListener("click", function () {
  const movementUi = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementUi);
});

// const movementUi = Array.from(
//  document.querySelectorAll(".movements__value")) also u can use const movementUi = [...document.querySelectorAll(".movements__value")]   THen we have to do the mapping seperately

// Day 44(Final Lectures)
// Array Practices

const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((acc) => acc > 0)
  .reduce((acu, aco) => acu + aco, 0);

console.log(bankDepositSum);

// using reduce how to count
const numDeposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;

const numDeposit1000Reduce = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acu, acc) => (acc >= 1000 ? ++acu : acu), 0);

console.log(`without reduce method ${numDeposit1000}`);
console.log(`with reduce method ${numDeposit1000Reduce}`);

// Advance use of reduce (We create a object not just one single value, it can be object and new array itself.)

// sums of deposit and withdrawals

const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sum, cur) => {
      sum[cur > 0 ? "deposits" : "withdrawals"] += cur; //  cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);  [Instead of this]
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// const sum = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sum, cur) => {
//       sum[cur > 0 ? 0 : 1] += cur; //  cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);  [Instead of this]
//       return sum;
//     },
//     [0, 0]
//   );   // array

// using string

const convertTitleCase = function (title) {
  const capatilise = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capatilise(word)))
    .join(" ");
  return capatilise(titleCase);
};

const titleCaseof = convertTitleCase("this is a nice title case");
console.log(titleCaseof);

// Coding challenge #4

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((dog) => (dog.recommendedFood = dog.weight ** 0.75 * 28));

console.log(dogs);

const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));

console.log(
  `Sarah's dogs eating too ${
    sarahDog.curFood < sarahDog.recommendedFood ? "little" : "much"
  }`
);

// 3

const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood)
  .flatMap((dog) => dog.owners);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .flatMap((dog) => dog.owners);

console.log(ownersEatTooMuch);

console.log(ownersEatTooLittle);

// 4

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);

console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

//  5
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

// 6
const isTheDogOk = (dog) =>
  dog.curFood >= dog.recommendedFood * 0.9 &&
  dog.curFood <= dog.recommendedFood * 1.1;
console.log(dogs.some((dog) => isTheDogOk(dog)));

// 7
const okDog = dogs.filter((dog) => isTheDogOk(dog));
console.log(okDog);

// 8

let copyOfDog = dogs.slice(0);

copyOfDog.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(copyOfDog);

// End Array Functuionality
