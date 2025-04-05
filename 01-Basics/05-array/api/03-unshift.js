/**
 * Array.prototype.unshift(element, ...elementsN)
 *
 * add elements to the beginning of the array.
 *
 * return value: the new length
 */

var arr = [1, 2, 3, 4];

// Inserting single element to the beginning of the array.
arr.unshift(5);
console.log(arr);
// Inserting multiple elements to the beginning of the array.
arr.unshift(8, 9);
console.log(arr);

// The return value is the new length.
console.log(arr.unshift(10)); // 8

// [1, 2, 3] --add 1, 2 to the front
//
// [, , 1, 2 ,3]

function myUnshift(arr) {
  // Move item to the right each by n step (length of arguments passed)
}