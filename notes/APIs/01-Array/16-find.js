/**
 * Array.prototype.find(callback, thisArg)
 *
 * - return the first element in the array that satisfy the test of the given callback function.
 */

var arr = [1, 2, 3, 4, 5];
var val = arr.find(function (element, index, array) {
  return element === 3;
});
console.log(val); // 3

function myFind(arr, callback) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }
}

var val2 = myFind(arr, function (element, index, array) {
  return element === 3;
});

console.log(val2); // 3


/* Complex logic in callback */
var arr2 = ["bc", "cdd", "f"];
var res = arr2.find(function (element, index, array) {
  var arr = element.split("");
  return arr.includes("d");
});
console.log(res); // cdd
