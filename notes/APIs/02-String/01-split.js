/**
 * String.prototype.split(pattern, [limit])
 *
 * - split a string with specific pattern, and return an array of splitted substrings.
 */

var str = "a*b*c*d";
var arr = str.split("*"); // split with *

console.log(arr); // [ 'a', 'b', 'c', 'd' ]

var str2 = "abcdef";
var arr2 = str2.split(""); // split with empty string ""
console.log(arr2); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
console.log(arr2); //

var str3 = "abcdef";
var arr3 = str3.split(); // this doesn't split
console.log(arr3); // [ 'abcdef' ]

/* Working with join */

var str = "1,2,3,4,5,6,7";
var arr = str.split(",");
console.log(arr); // [1, 2, 3,4 ,5, 6, 7]
var strAgain = arr.join(",");
console.log(strAgain); // '1,2,3,4,5,6,7'

/* Split rgb */
var color = "rgb(2,33,44)";
// \d: any 0 - 9 digit
// ^\d: digits that are not 0 - 9. => it can be "rgb(", ",", ")".
var rgbArr = color.split(/[^\d]+/);
console.log(rgbArr); // [ '', '2', '33', '44', '' ]

/* Split url - get targetId & preview values */
var url = "https://www.icodingedu.com/goods/show/42?targetId=71&preview=0";
var info = url.split("?")[1].split("&");
var obj = {}; // We use obj to store.
for (var i = 0; i < info.length; i++) {
  var temp = info[i].split("=");
  obj[temp[0]] = temp[1];
}
console.log(obj);
// [ 'targetId', '71' ]
// [ 'preview', '0' ]
