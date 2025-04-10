/**
 * Array.prototype.pop()
 *
 * remove the last array item.
 *
 * return value: the removed item from the array. undefined if the array is empty.
 */

var arr = [1, 2, 3];

console.log(arr.pop()); // 3 - the removed item
console.log(arr); // [1, 2]

var arr2 = [];
console.log(arr2.pop()); // undefined
console.log(arr2); // []

// Clear the array

var arr3 = [1, 2, 3];

// arr.lenght = 3
var len = arr3.length; // Note: the length is computed dynamically. We need to initially store the value of length in a variable.
for (var i = 0; i < len; i++) {
  arr3.pop();
}

console.log(arr3);


/* Simpler yet effective way to clear an array */
function clear(arr) {
  arr.length = 0;
}

var arr4 = [1, 2, 3, 4, 5];
console.log(arr4);
clear(arr4);
console.log(arr4);
