/* values from prompt is string type. */
var num1 = prompt("Enter number 1: "); // 132143..32423432
var num2 = prompt("Enter number 2: "); // 112321.12134abc

/* I use parseFloat to handle case like floating point number, and leading / trailing spaces */
var sum = parseFloat(num1) + parseFloat(num2); // 244464.12134
// Alternative:
// var sum = Number(num1) + Number(num2);

var subtraction = num2 - num1;
alert(
  "The sum of Number " + num1 + " + " + "Number " + num2 + " is " + sum + "."
); // 244464.12134
alert(subtraction);
