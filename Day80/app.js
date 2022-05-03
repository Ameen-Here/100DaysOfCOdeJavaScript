// Importing Module

import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

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
console.log("state copy is ", stateDeep);
