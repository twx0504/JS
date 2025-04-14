/**
 * Array.prototype.slice([start], [end])
 *
 * return a portion of an array from start index to end (not included).
 *
 *            [1, 2, 3, 4, 5]
 * index (+):  0  1  2  3  4
 * index (-): -5 -4 -3 -2 -1
 *
 * +ve: 0 -> arr.length
 * -ve: -arr.length -> -1
 *
 * extraction: always starts with start index (left to right direction).
 * - when [5, 3] -> this is going to return an empty [].
 *
 *
 * return value: a shallow copy of a portion of an array.
 */

// var arr = [1, 2, 3, 4, 5];
// var portion1 = arr.slice(); // copy the entire array (shallow copy) similar to arr.slice(0, arr.length)
// console.log(portion1); // [ 1, 2, 3, 4, 5 ]
// var portion2 = arr.slice(2);
// console.log(portion2); // [ 3, 4, 5 ]
// var portion3 = arr.slice(2, 4);
// console.log(portion3); // [ 3, 4 ]
// var portion4 = arr.slice(-1);
// console.log(portion4); // [5]
// var portion5 = arr.slice(-3);
// console.log(portion5); // [ 3, 4, 5 ]
// var portion6 = arr.slice(-arr.length, -3);
// console.log(portion6); // [ 1, 2 ]
// var portion7 = arr.slice(3, 2);
// console.log(portion7); // [] note: it only searches from the start index to the right. So, this returns an empty array.
// var portion8 = arr.slice(-1, -3); // [] note: it only searches from left to right.
// console.log(portion8);
// var portion9 = arr.slice(1, -3);
// console.log(portion9); // [2]
// var portion10 = arr.slice(-2, arr.length - 1);
// console.log(portion10); // [4]

// /* Practices */
// var arr = [1, 2, 3, 4, 5];
// console.log(arr.slice(3, -1)); // [ 4 ]
// console.log(arr.slice(-2, 3)); // []
// console.log(arr.slice(3, -2)); // []

// /* Shallow Copy */
// console.log("Shallow Copy");
// var arr = [1, 2, 3, 4, ["A", "B"]];
// var arr2 = arr.slice();
// console.log(arr);
// console.log(arr2);
// console.log(arr === arr2);
// arr2[4][1] = "X";
// // Both arr and arr2 reflects the same changes.
// console.log(arr);
// console.log(arr2);
// console.log(arr[4] === arr2[4]); // true -> means they are the same (use the same address)

// // Changing the value of primitive shows expected result.
// arr2[2] = "a";
// console.log(arr); // [ 1, 2, 3, 4, [ 'A', 'X' ] ]
// console.log(arr2); // [ 1, 2, 'a', 4, [ 'A', 'X' ] ]

// len = 4
// [1, 2, 3 , 4]
//  0  1  2   3   (+ve)
// -4 -3 -2  -1   (-ve)

// start = -3  => 1
// end = -1 => 3
function mySlice(arr, start, end) {
  if (!Array.isArray(arr)) return [];
  if (start < -arr.length) {
    start = 0;
  } else if (start === undefined) {
    start = 0;
  }
  if (end < -arr.length) {
    end = 0;
  } else if (end === undefined || end >= arr.length) {
    end = arr.length;
  }
  if (start < 0) {
    start += arr.length;
  }
  if (end < 0) {
    end += arr.length;
  }

  // start >= arr.length, return empty[]
  if (start >= arr.length) return [];
  // end <= start returns empty
  if (end <= start) return [];

  var res = [];
  for (var i = start; i < end; i++) {
    res.push(arr[i]);
  }
  return res;
}

var arr = ["a", "b", "c", "d"];
console.log(mySlice(arr)); // ["a", "b", "c", "d"]
console.log(arr.slice());
console.log(mySlice(arr, 2)); // ["c", "d"]
console.log(arr.slice(2));
console.log(mySlice(arr, 2, 3)); // ["c"]
console.log(arr.slice(2, 3));
console.log(mySlice(arr, -3, -1)); // ["b", "c"]
console.log(arr.slice(-3, -1));
console.log(mySlice(arr, -3)); // ["b", "c", "d"]
console.log(arr.slice(-3));
console.log(mySlice(arr, 0, 0)); // []
console.log(arr.slice(0, 0));
console.log(mySlice(arr, 1, arr.length)); // ["b", "c", "d"]
console.log(arr.slice(1, arr.length));
console.log(mySlice(arr, -2)); // ["c", "d"]
console.log(arr.slice(-2));
console.log(mySlice(arr, 0)); // ["a", "b", "c", "d"]
console.log(arr.slice(0));
console.log(mySlice(arr, -1)); // ["a", "b", "c", "d"]
console.log(arr.slice(-1));
