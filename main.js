// 1. Variables and Data Types

let name = "Hassan"; // Declare a string variable
let age = 22; // Declare a number variable
let isStudent = true; // Declare a boolean variable
let result = 5 + 7; // Add two numbers and store the result
let message = "Hello, " + name + "! Welcome to JavaScript."; // Concatenate name with greeting message

// 2. Conditional Statements

let number = 12;

// a. Check if number is greater than 10
if (number > 10) {
  console.log("Number is greater than 10");
}

// b. Check if number is even or odd
if (number % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}

// c. Check if student passed (score >= 60)
let score = 75;
if (score >= 0) {
  if (score >= 60) {
    console.log("Passed");
  } else {
    console.log("Failed");
  }
}

// d. Switch case for day of the week
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of the week!");
    break;
  case "Friday":
    console.log("Weekend is near!");
    break;
  default:
    console.log("Regular day");
}

// e. Ternary operator to check voting eligibility
let voteMessage = age >= 18 ? "Eligible to vote" : "Not eligible to vote";
console.log(voteMessage);

// 3. Loops

// a. For loop from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// b. While loop for even numbers between 1 and 10
let i = 2;
while (i <= 10) {
  console.log(i);
  i += 2;
}

// c. Do-while loop: ask user for number until they enter a negative one
let input;
do {
  input = prompt("Enter a number (negative to stop):");
} while (input >= 0);

// d. For loop to display names in an array
let names = ["Ali", "Sara", "Mona"];
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}

// e. Sum of all numbers in an array
let nums = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
  sum += nums[i];
}
console.log("Sum:", sum);

// 4. Arrays

let colors = ["red", "green", "blue"]; // Create an array

console.log(colors[1]); // Access the second element

colors.push("yellow"); // Add new color at the end

colors.shift(); // Remove the first color

colors[1] = "purple"; // Update the second color

console.log(colors);

// 5. Functions

// a. Function to add two numbers
function add(a, b) {
  return a + b;
}

// b. Function to check if a number is even
function isEven(num) {
  return num % 2 === 0;
}

// c. Function to greet a person
function greet(name) {
  return "Hello, " + name + "!";
}

// d. Function to calculate area of a circle
function calculateArea(radius) {
  return Math.PI * radius * radius;
}

// e. Function to reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}
