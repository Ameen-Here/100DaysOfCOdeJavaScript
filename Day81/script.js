// Importing Module

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";   WHILE IN DEVELOPMENT PHASE

import { cloneDeep } from "lodash-es"; // Since parcel bundels all the script together, no need of specifying path

import "core-js/stable"; // For pollyfilling

import "regenerator-runtime/runtime"; // for pollyfilling async functions

// import { shippingCost, basket, price } from "./shoppingCart.js";

// import name from "./shippingCart2.js";

// console.log("Importing Module shopping cart and shippingcart");

// name();

// console.log(price);

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "milk", quantity: 5 },
  ],
  user: { isLoggedIn: true },
};

// Common way of copying

// const stateClone = Object.assign({}. state)      THIS WONT WORK SINCE IT's NESTED OBJECT, SO WE USE DEEPCOPY FROM
//                                                  Loadash Library

const stateDeep = cloneDeep(state);
console.log(stateDeep);

stateDeep.user.isLoggedIn = false;

console.log("state is ", state);
console.log(`state copy is ${stateDeep}`);

if (module.hot) {
  module.hot.accept();
}

console.log("hello");

// For testing ES6 convert

Promise.resolve("TEST").then((x) => console.log(x));
