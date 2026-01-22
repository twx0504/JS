/**
 * Array.prototype.includes(searchElement, fromIndex)
 * - check if an array contains searchElement.
 *
 * Return value: boolean (true if found within the array) Otherwise false.
 * 
 * note: NaN can be correctly searched for.
 */

var arr = [1, 2, 3, 4, NaN, -0];

console.log(arr.includes(2)); // true
console.log(arr.includes(5)); // false
console.log(arr.includes(3, 1)); // true
console.log(arr.includes(NaN)); // true
console.log(arr.includes(0)); // true
console.log(arr.includes(2, -4)); // false

function myIncludes(arr, elem, start) {
  start = start || 0;

  if (start < 0) start += arr.length;
  var len = arr.length;

  for (var i = start; i < len; i++) {
    if (arr[i] === elem) return true;
    if (
      typeof arr[i] === "number" &&
      typeof elem === "number" &&
      isNaN(arr[i]) &&
      isNaN(elem)
    ) {
      return true;
    }
  }
  return false;
}
console.log(myIncludes(arr, NaN)); // true
console.log(myIncludes(arr, 2)); // true
console.log(myIncludes(arr, 4)); // true
console.log(myIncludes(arr, 0)); // true
console.log(myIncludes(arr, 9)); // false
