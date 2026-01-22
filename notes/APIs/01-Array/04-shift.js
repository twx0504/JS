/**
 * Array.prototype.shift()
 *
 * remove the first item and return the removed element.
 *
 * return value: the removed element. If array is empty, return undefined.
 */

var arr = [1, 2, 3];

console.log(arr.shift()); // 1 - the removed element
console.log(arr); // [2, 3]

// [1, 2, 3] -> [x, 2, 3]
function myShift(arr) {
  if (arr.length === 0) return undefined;
  var len = arr.length;
  var first = arr[0];
  for (var i = 0; i < len; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length -= 1;
  return first;
}

var arr = [1, 2, 3, 4];
console.log(myShift(arr));
console.log(arr);
console.log(myShift(arr));
console.log(arr);
console.log(myShift(arr));
console.log(arr);
console.log(myShift(arr));
console.log(arr);
// When the array is already empty, return undefined.
console.log(myShift(arr));
