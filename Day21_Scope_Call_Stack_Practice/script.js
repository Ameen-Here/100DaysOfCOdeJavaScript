"use strict";
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstNaem);
  function printAge() {
    const output = `You are ${age}, born in ${birthYear}`;
    console.log(output);
  }
  printAge();
  return age;
}

const firstNaem = "Ameen";
const age_of_user = calcAge(1999);
console.log(age_of_user);

agee();

// Can't be accessed
// console.log(addExpr(1, 2));
// console.log(addArrow(1, 2));
// Fuctions
function agee() {
  console.log(1);
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;
