/**
 * Array.prototype.lastIndexOf(searchElement, fromIndex)
 * returns the index of the last element.
 *
 * Return value: index of the last element, otherwise -1.
 *
 * Note: the array is searched backwards, starting at fromIndex.
 * - fromIndex: default arr.length - 1
 */

var arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(arr.lastIndexOf(3)); // 2

var arr2 = [1, 3, 4, 2, 3, 2, 4, 2, 7];
console.log(arr2.lastIndexOf(2)); // 7
console.log(arr2.lastIndexOf(2, arr2.length)); // 7 (note: this is still okay, although it is exceeding the last item index)

function myLastIndexOf(arr, elem, start) {
  start = start || arr.length - 1;
  // Handle negative start index
  if (start < 0) start += arr.length;
  for (var i = start; i >= 0; i--) {
    if (arr[i] === elem) return i;
  }
  return -1;
}

console.log(myLastIndexOf(arr, 3));
console.log(myLastIndexOf(arr2, 2));
console.log(myLastIndexOf(arr2, 2, 4));
console.log(myLastIndexOf(arr2, 2, -5));
