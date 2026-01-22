/**
 * Array.prototype.sort(callback)
 *
 * case 1: without callback, convert items to string, and compare their unicode / UTF-16 code unit order.
 * case 2: callback
 *  a = prev element
 *  b = next element
 *  when the return value of the callback is > 0, the exchange between a & b happens.
 *
 *  put larger item at the back
 *  `return a - b` ==> a - b > 0 increasing
 *
 *  put larger item in the front
 *  `return b - a` ==> b - a > 0 decreasing
 *
 * Remember:
 * thinking the order of a and b
 * a then b in alphabet right?
 * so if a - b means we sort in a -> b it is increasing
 *
 * if b - a means we sort in b -> a it is decrasing
 */

var arr = [4, 1, 2, 4, 7, 88, 12];

/* Without providing callback, the array is sorted based on unicode. */
/* Each item is converted to string and compare their UTF-16 code units order. */
arr.sort();
console.log(arr); //['1', '12', '2', '4', '4', '7', '88']

/* Increasing Order */
var arr = [4, 1, 2, 4, 7, 88, 12];
arr.sort(function (a, b) {
  // a = 4  b = 1 (a is prev element, b is next element)
  // a - b = 4 - 1 = 3
  // since a - b > 0, it means a is greater than b, so they will exchange.
  return a - b; // increasing order
});

console.log(arr); // [1, 2, 4, 4, 7, 12, 88]

/* Decreasing Order */
var arr = [4, 1, 2, 4, 7, 88, 12];
arr.sort(function (a, b) {
  // a = 4
  // b = 1
  // b - a > 0 only if b is bigger than a, the condition is satisfied, and they will exchange.
  return b - a; // decreasing order
});
console.log(arr); // [ 88, 12, 7, 4, 4, 2, 1]

/* Working with an array of string and sorted based on string length */

var arr = ["1234", "absadff", "asdasfefafewf", "sa"];
// sort in descending order.
arr.sort(function (a, b) {
  return b.length - a.length;
});
console.log(arr); // [ 'asdasfefafewf', 'absadff', '1234', 'sa' ]

function bubbleSort(arr, callback) {
  var len = arr.length - 1;
  var isSorted;
  var sortedBorder = len;
  var index;
  for (var i = 0; i < len; i++) {
    isSorted = true;
    for (var j = 0; j < sortedBorder; j++) {
      if (callback(arr[j], arr[j + 1]) > 0) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        index = j;
        isSorted = false;
      }
    }
    if (!isSorted) {
      sortedBorder = index;
    }
    if (isSorted) {
      return arr;
    }
  }
}
var arr2 = ["1234", "absadff", "asdasfefafewf", "sa"];
bubbleSort(arr2, function (a, b) {
  return b.length - a.length;
});
console.log(arr2);
