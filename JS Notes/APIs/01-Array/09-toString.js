/**
 * Array.prototype.toString()
 *
 * - internally call join method.
 * Return value: a string representation of the array elements separated by commas.
 *
 * If the join method is unavailable or not a function, Object.prototype.toString will be used instead, and returns `[object Array]`
 */

var arr = [1, 2, 3, 4];
console.log(arr.toString()); // '1,2,3,4'

function fakeJoin() {
  return "I am fake.";
}

/* Replace join method of Array.prototype with my implementation */
// Array.prototype.join = join;

// Add new method to arr instance:
arr.join = fakeJoin;
console.log(arr.toString()); // 'I am fake.' - either cases, toString will call join internally and return the return value of join method.

/* How toString and join in prototype working together: */


/* Join: circular reference is not handled here just yet. */
Array.prototype.join = function (separator) {
  if (this.length === 0) return "";
  if (this.length === 1) return "" + this[0];
  var len = this.length;
  var str = "";
  separator = separator || ",";
  for (var i = 0; i < len; i++) {
    if (i === len - 1) {
      str += this[i]; // recursively call toString
    } else {
      str += this[i] + separator; // recursively call toString
    }
  }
  return str;
};

Array.prototype.toString = function () {
  return this.join();
};

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 1, 9],
];

/* Circular Reference Issue -> Stackover flow */
// matrix[2][2] = matrix;


console.log(matrix.toString()); // Internally calling join recursively.


// var arr2 = ["A", "B", "C"];
// console.log(arr2.toString()); // 'A,B,C'

/* Implementation of toString */

// function myToStringArray(arr) {
//   return arr.join();
// }

// console.log(myToStringArray(arr)); // 'I am fake.'
