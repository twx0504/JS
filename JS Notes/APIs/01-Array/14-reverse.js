/**
 * Array.prototype.reverse()
 *
 * - reverse the original array. (mutate original array)
 */

var arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr);

// Reverse a string
var str = "123456789";
var arr = str.split("").reverse();
var newStr = arr.join("");
console.log(newStr);

// [1, 2 ,3 ,4, 5]
//  i           j
//     i    j
//       ij
function myReverse(arr) {
  var i = 0;
  var j = arr.length - 1;
  while (i < j) {
    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
    i++;
    j--;
  }
}

var arr = [1, 2, 3, 4];
myReverse(arr);
console.log(arr);
