// Default Exporting
console.log("ShippingCart2 Module");

export default function () {
  console.log("default Function is called");
  const randInt = Math.floor(Math.random() * 6) + 1;
  console.log("random Number is " + randInt);

  return randInt;
}
