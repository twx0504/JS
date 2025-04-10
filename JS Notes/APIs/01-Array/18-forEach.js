/**
 * Array.prototype.forEach(callback, thisArg)
 *
 * - execute callback for each array item.
 *
 * Return value: undefined.
 *
 * Caveat: index of the callback is fixed every time when the callback is called.
 * - When you delete element, and wish to modify arr.length by arr.length -= 1 it is not going to work.
 * - It is not going to affect the next call.
 */

var arr = [1, 2, 3, 4, 5];
var res = [];
var res2 = [];
arr.forEach(function (element, index, array) {
  element += 1;
  res.push(element);
});
console.log(arr);
console.log(res);

function myForEach(arr, callback) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    /* Note: the index i is fixed here, so modifying i inside callback has no effect on index on the next callback index */
    callback(arr[i], i, arr);
  }
}

myForEach(res, function (element, index, array) {
  res2.push(element + 1000);
});

console.log(res2); // [ 1002, 1003, 1004, 1005, 1006 ]

/* Case 0: Use of break / return cannot terminate the forEach loop. */
// var arr = [1, 2, 3, 4, 5];
// arr.forEach(function (element, index, array) {
//   console.log(element);
//   if (element === 3) {
//     break; // SyntaxError: Illegal break statement
//     // return; // this only terminate the execution of this callback.
//   }
// });

// console.log(arr);

/* Case 1: Do not delete the item inside forEach!!! This would result in skipping one or more elements!!! */
var arr = [1, 2, 3, 4, 5];
arr.forEach(function (element, index, array) {
  console.log(element);
  /** Printing before check
   * 1
   * 2
   * 3  <-- where is 4 now??? It is already being skipped.
   * 5
   *
   * When you delete item (3), the original array changes to [1, 2, 4, 5].
   * The item (4) is now at index 2. But the callback index is still 3.
   * This causes item (4) being skipped.
   */
  if (element === 3) {
    arr.splice(index, 1); // remove one item at index
  }
  // correct the index back to the position of deleted item.
  /* But this is useless. The index in this callback is fixed in each turn of iterations.*/
  index--;
});

console.log(arr);

/* Case 2: What happens when we change the array item that is yet visited inside forEach callback? */
var arr = [1, 2, 3, 4, 5];
var newArr = [];
arr.forEach(function (element, index, array) {
  arr[arr.length - 1] =
    "I changed"; /* I changed the element that is yet visited. */
  console.log(element);
  // 1
  // 2
  // 3
  // 4
  // I changed /* Note: you can see the change can be seen! */
  newArr.push(element);
});
console.log(newArr); // [ 1, 2, 3, 4, 'I changed' ]

/* Case 3: Add elements after forEach starts, they are not visited. */
var arr = [1, 2, 3];
var newArr = [];
arr.forEach(function (element, index, array) {
  array.push("123"); /* We try to push new item into arr */
  console.log(element);
  console.log(array);
  // 1
  // [ 1, 2, 3, '123' ]
  // 2
  // [ 1, 2, 3, '123', '123' ]
  // 3
  // [ 1, 2, 3, '123', '123', '123' ]
  newArr.push(element);
});

console.log(newArr); // [ 1, 2, 3 ] Note: the newArr only contains the elements that already existed. Not the one added during forEach execution.

/* Compare for loop & forEach 
  - for loop has better performance.
*/
var arr = [];
for (var i = 0; i < 100 * 1000000; i++) {
  arr.push(i);
}

var new1 = [];
var new2 = [];
var len = arr.length;
console.time("for loop");
for (var i = 0; i < len; i++) {
  new1.push(arr[i]);
  fn(arr[i], i, arr);
}
function fn(element, index, arr) {}
console.timeEnd("for loop");
console.log(new1);
console.time("forEach");
arr.forEach(function (element, index, array) {
  new2.push(element);
});
console.timeEnd("forEach");
console.log(new2);
// for loop: 23.678ms
// forEach: 34.416ms
