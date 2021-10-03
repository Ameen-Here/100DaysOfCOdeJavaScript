// 'use strict';

// // let hasDriverLicense = false;
// // const passTest = true;

// // if (passTest) hasDriverLicese = true; /* THIS WILL BE CAUGHT IN STRICT MODE */
// // if (hasDriverLicense) console.log("I can drive xD");

// // defining a function
// function logger() {
//     console.log("My name is Ameen.");
// }

// // calling / running / invoking function
// logger();
// logger();
// logger();

// //  FUnction with parametres
// function fruitProccessor(apples, oranges) {
//     console.log(apples, oranges);
//     const juice = `Juice with ${apples} apples and ${oranges} oranges`;
//     return juice
// }

// // calling function with parametres with arguments
// juice_drink = fruitProccessor(5, 0);

// // Printing the return value from function fruitProcessor
// print(juice_drink);

// 'use strict';
// // Function Declaration
// function calcAge1(birthYear) {
//     return 2021 - birthYear;
// }

// const age1 = calcAge1(1999);
// console.log(age1);

// // Function Expression
// const calcAge2 = function (birthYear) {
//     return 2021 - birthYear;
// }

// const age2 = calcAge2(1999);
// console.log(age2)

// // Arrow Function
// const calcAge3 = (birthYear, firstName) => `${firstName} should retire in ${65 - (2021 - birthYear)}`;

// const age3 = calcAge3(1999, "Ameen");
// console.log(age3)

// const cutFruitPieces = function (fruit) {
//     return fruit * 4;
// }

// function fruitProccessor(apples, oranges) {
//     console.log(apples, oranges);
//     applePieces = cutFruitPieces(apples);
//     orangePieces = cutFruitPieces(oranges);
//     const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges`;
//     return juice;
// }

// console.log(fruitProccessor(5, 4));

// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// const checkWinner = function (avgDolphin, avgKoalas) {
//     if (avgDolphin > 2 * avgKoalas) console.log(`Dolphin team wins with a average score of ${avgDolphin}. (${avgDolphin} v ${avgKoalas})`);
//     else if (avgKoalas > 2 * avgDolphin) console.log(`Koalas team wins with a average score of ${avgKoalas}. (${avgDolphin} v ${avgKoalas})`);
//     else console.log("No winners")
// }

// const averageDolphin = calcAverage(85, 54, 41);
// const averageKoalas = calcAverage(23, 34, 27);

// checkWinner(averageDolphin, averageKoalas);

// const friend1 = "ameen";
// const friend2 = "noushda";
// const friend3 = "manu";

// // But array for such similar names and datas
// const friend = ["ameen", "noushad", "manu"];

// // another method
// const year = new Array(1999, 1971, 2004);

// // Arrays are 0 based index
// console.log(year[0]); // will give first value of array friend
// console.log(friend.length); // To get the length of arra, not 0 based.
// console.log(friend[friend.length - 1]);  // To get last element

// // array inside array adn different data types in one array

// const ameen = [friend[0], "noushad", 2021 - 1999, "student", year];
// console.log(ameen);

// console.log(friend);

// // Exercise

// const calcAge2 = function (birthYear) {
//     return 2021 - birthYear;
// }

// const years = [1999, 2000, 2012, 1973]

// const friend = ["ameen", "noushad", "manu"];
// const new_length = friend.push("asma"); // Will add the element to the last and return new length
// console.log(friend);
// const last_deleted = friend.pop(); // Will delete the last element and return the deleted element
// console.log(friend);
// friend.unshift("Pachu"); // Will add element to the beginning and return new length
// console.log(friend);

// friend.shift(); // Will delete the element of the begining
// console.log(friend);

// console.log(friend.indexOf("bob"));  // returns -1 since no element is there 
// console.log(friend.indexOf("ameen")); // Returns index

// console.log(friend.includes("ameen"));  // return true or false
// console.log(friend.includes("Bob"));  // It does strict equality

// if (friend.includes("manu")) {
//     console.log("You have a friend Manu");
// }

// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

while (true) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) break;
    console.log(`dice is ${dice}`);
}






