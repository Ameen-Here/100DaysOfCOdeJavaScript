// Exporting Module

import randInt from "./shippingCart2.js";
console.log("shoppingCart module");

export const shippingCost = 10;

console.log("Calling Shipcart2 function from shoppingCart");
const price = randInt();
const basket = 222;
export { price, basket };
