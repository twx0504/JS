/* Change this */
// var obj = {
//   a: 1,
//   b: 2,
//   c: 3,
// };

// function sum(a, b, c) {
//   console.log(this.a, this.b, a, b, c);
// }

// // newSum has this points to obj, and also some initial arguments.
// var newSum = sum.bind(obj, "A", "B", "C");
// newSum(); // 1 2 A B C

/* Create a function containing initial arguments */
// var obj = {
//   a: 1,
//   b: 2,
//   c: 3,
// };

// var c = 5;
// function sum(a, b, c) {
//   console.log(a, this.b, c);
// }

// var fn = sum.bind(obj, "A"); // contains first argument.
// fn("B", "C"); // A 2 C

// var fn2 = sum.bind(obj, "A", "B"); // contains first and second arguments.
// fn2("C"); // A 2 C

/* Compare two values */

/**
 * General Comparison Function
 *
 * Compares two numbers and returns true if the first is greater than or equal to the second.
 *
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @returns {boolean} True if a >= b, otherwise false.
 */
function compare(a, b) {
  return a >= b;
}

/**
 * Checks if a score meets or exceeds the passing score.
 *
 * Passing score is preset to 500.
 *
 * @function
 * @param {number} score - The score to be checked.
 * @returns {boolean} True if score >= 500, otherwise false.
 */

var comparePassingScore = compare.bind(null, 500); // contains initial argument a already.

// when we call, we only need to provide one argument (which is b)
console.log(comparePassingScore(20)); // false
console.log(comparePassingScore(7)); // true
console.log(comparePassingScore(10)); // true

var person = {
  name: "Too Wei Xin",
};

function hobbies(a, b, c) {
  console.log(this.name + " has hobbies such as " + a + ", " + b + ", " + c);
}

hobbies.call(person, "drawing", "reading", "singing");
hobbies.apply(person, ["drawing", "reading", "singing"]);
var myHobbies = hobbies.bind(person, "drawing");
myHobbies("reading", "studying");
