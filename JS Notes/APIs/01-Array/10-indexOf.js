/**
 * Array.prototype.indexOf(searchElement, fromIndex)
 *
 * return the index of the first element found.
 *
 * Return value: index of first item, otherwise -1.
 *
 * note: fromIndex can be negative. Refer to slice.
 * - fromIndex default is 0.
 */
var arr = [1, 2, 3, 4, 5, 6];

function myIndexOf(arr, elem, start) {
  start = start || 0;

  // Handle negative start index
  if (start < 0) start += arr.length;
  var len = arr.length;
  for (var i = start; i < len; i++) {
    if (arr[i] === elem) return i;
  }
  return -1;
}

console.log(myIndexOf(arr, 3));
console.log(myIndexOf(arr, 100));
console.log(myIndexOf(arr, 3, 4));
console.log(myIndexOf(arr, 6, -4));
console.log(myIndexOf(arr, 1, -arr.length)); // 0  (start from the first item)
console.log(myIndexOf(arr, 1, -arr.length + 1)); // -1 (start from the first second item)
