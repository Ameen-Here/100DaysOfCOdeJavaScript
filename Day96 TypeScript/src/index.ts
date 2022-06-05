// Basic types

let company: string = "Air";
let isPublished: boolean = false;
const id: number = 5;

let x: any = "hello"; // we can change it to whatever we like

x = 1;
x = false;

let age: number;

age = 20;

// age = "hello"  cant do this

console.log(id, company);

let ids: number[] = [1, 3, 5];

// tuple

let person: [number, string, boolean] = [1, "my name", false];

// tuple array
let employee: [number, string][];
employee = [
  [1, "jonas"],
  [2, "jockey"],
  [3, "vasu"],
  [1, "harry"],
];

// union and enum

let code: string | number = 23;

// Enum

enum direction1 {
  Up,
  Down,
  Left,
  Right,
}
