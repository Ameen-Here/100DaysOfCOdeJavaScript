"use strict";
// Basic types
let company = "Air";
let isPublished = false;
const id = 5;
let x = "hello"; // we can change it to whatever we like
x = 1;
x = false;
let age;
age = 20;
// age = "hello"  cant do this
console.log(id, company);
let ids = [1, 3, 5];
// tuple
let person = [1, "my name", false];
// tuple array
let employee;
employee = [
  [1, "jonas"],
  [2, "jockey"],
  [3, "vasu"],
  [1, "harry"],
];
// union and enum
let code = 23;
// Enum

var direction1;
(function (direction1) {
  direction1[(direction1["Up"] = 0)] = "Up";
  direction1[(direction1["Down"] = 1)] = "Down";
  direction1[(direction1["Left"] = 2)] = "Left";
  direction1[(direction1["Right"] = 3)] = "Right";
})(direction1 || (direction1 = {}));
