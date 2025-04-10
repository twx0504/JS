/**
 * Array.prototype.filter(function(element, index ,array){}, thisArg)
 *
 * - return a shallow copied portion of the array containing only elements that pass the test implemented by callback.
 * - when the callback returns true, the element will be pushed into a new array. Otherwise, it is not.
 * 
 * - note: modify element inside callback doesn't reflect changes on the original array. 
 * - caveat: be careful if the element is itself a reference data type. Modifying it will causes the item in the original array to be modified too!
 */

var arr = [1, 2, 3, 4, 5];

var newArr = arr.filter(function (element, index, arr) {
  return element; // note: if element is falsy, it is false.
});

var newArr2 = arr.filter(function (element, index, arr) {
  return element >= 2;
});

var newArr3 = arr.filter(function (element, index, arr) {
  return element % 2 === 0;
});

console.log(newArr); // [ 1, 2, 3, 4, 5 ]
console.log(newArr2); // [ 2, 3, 4, 5 ]
console.log(newArr3); // [ 2, 4 ]

/* Finding string element with its length > 2 */
var strArr = ["abc", "aa", "a", "asdadasd", "asdsawadawdf"];
var newStrArr = strArr.filter(function (element, index) {
  return element.length > 2;
});
console.log(newStrArr); // [ 'abc', 'asdadasd', 'asdsawadawdf' ]

/* Modify the string */
var modifiedStrArr = strArr.filter(function (element, index) {
  element += "modified";
  console.log(element);
  return element.length > 16;
});

// Notice that the return array still contains unmodified element.
// We can conclude that the logic inside the callback is just for the test.
// The changes will not reflect on the element.
// We can use this to do more complex test.
console.log(modifiedStrArr); // [ 'asdsawadawdf' ]

var strArr = ["abc", "123", "564", "xyz", "aaa"];

/* Finding element that contains 'a' character. */
var moreComplexStrArr = strArr.filter(function (element, index) {
  var arr = element.split("");
  return arr.includes("a");
});

console.log(moreComplexStrArr); // [ 'abc', 'aaa' ]

function myFilter(arr, callback) {
  var res = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    // if (arr[i] > 5) {
    //   res.push(arr[i]);
    // }
    if (callback(arr[i], i, arr)) { // usually arr[i] is a primitive type. Modifying primitive type doesn't change the item in the original array. Unless it is a reference type.
      res.push(arr[i]);
    }
  }
  return res;
}


/* Be careful when the array item contains reference type! Avoid making changes to them because the changes can be reflected on the original array. */
var arr = [1, 2, 3, 4, 5, [1, 2, 3]];
console.log(
  myFilter(arr, function (element, index, arr) {
    if (index === 5) {
      element[0] = "X"; // Usually modify element will not modify the original array. But if the element is a reference type, it will change!
    }
    return true;
  })
);
