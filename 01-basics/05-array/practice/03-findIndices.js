var arr = ["a", "b", "a", "c", "d", "a", "f", "a"];

// Find all the indices of string 'a' within an array, and return all indices in the form of array.

// /* For loop */
// function findIndices(arr, searchElement, start) {
//   if (!Array.isArray(arr)) return;
//   start = start || 0;
//   if (start < 0) {
//     start += arr.length;
//   }
//   var len = arr.length;
//   var res = []; // stores all indices found.
//   for (var i = start; i < len; i++) {
//     if (arr[i] === searchElement) {
//       res.push(i);
//     }
//   }
//   return res;
// }

/* indexOf() */
function findIndices(arr, elem, start) {
  if (!Array.isArray(arr)) return;
  start = arr.indexOf(elem, start || 0);

  var res = [];
  while (start !== -1) {
    // When it reaches the end of the array, and nothing is found, it will return -1 and exit while loop.
    res.push(start);
    start = arr.indexOf(elem, start + 1); // find the next element index, starts with current index + 1.
  }
  return res;
}

/* Recursion V1*/
function findIndicesRecursionV1(arr, elem, start) {
  if (!Array.isArray(arr)) return;
  var res = [];
  function _findIndex() {
    start = arr.indexOf(elem, start || 0);
    if (start === -1) return;
    res.push(start);
    start++;
    _findIndex();
    // arguments.callee(); // refers to the function where arguments is.
  }
  _findIndex();
  return res;
}

/* Recursion IIFE */

function findIndicesRecursion(arr, elem, start) {
  if (!Array.isArray(arr)) return;
  var res = [];

  (function findIndex() {
    start = arr.indexOf(elem, start || 0);
    if (start !== -1) {
      res.push(start);
      start++;
      findIndex();
    }
  })();
  return res;
}

console.log(findIndices(arr, "a"));
console.log(findIndicesRecursionV1(arr, "a"));
console.log(findIndicesRecursion(arr, "a"));
