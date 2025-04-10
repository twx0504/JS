/**
 * Array.prototype.join([separator])
 *
 * - create and return a new string by concatenating all the elements of the array with commas or separator if specified.
 * Return value: a string.
 *
 */

var arr = [1, 2, 3, 4];
var str = arr.join();
var str2 = arr.join("|");
var str3 = arr.join("*");
console.log(str); // '1,2,3,4'
console.log(str2); // 1|2|3|4
console.log(str3); // 1*2*3*4

function join(arr, separator) {
  if (arr.length === 0) return "";
  if (arr.length === 1) return "" + arr[0];
  var len = arr.length;
  var str = "";
  separator = separator || ",";
  for (var i = 0; i < len; i++) {
    if (i === len - 1) {
      str += arr[i];
    } else {
      str += arr[i] + separator;
    }
  }
  return str;
}

var arr = ["a", "b", "c", 1, 2];
var arr2 = [];
var arr3 = [1];
var newStr = join(arr, "|");
var newStr2 = join(arr2, "|");
var newStr3 = join(arr3, "|");
console.log(newStr);
console.log(newStr2);
console.log(newStr3);


/* Replace join method of Array.prototype with my implementation */
Array.prototype.join = join;

console.log(arr.join(arr, "|"));


