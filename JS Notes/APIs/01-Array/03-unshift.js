/**
 * Array.prototype.unshift(element, ...elementsN)
 *
 * add elements to the beginning of the array.
 *
 * return value: the new length
 */

var arr = [1, 2, 3, 4];

// Inserting single element to the beginning of the array.
arr.unshift(5);
console.log(arr);
// Inserting multiple elements to the beginning of the array.
arr.unshift(8, 9);
console.log(arr);

// The return value is the new length.
console.log(arr.unshift(10)); // 8

// [1, 2, 3] --add 1, 2 to the front
//
// [, , 1, 2 ,3]

function myUnshift(arr) {
  var argumentsLen = arguments.length - 1;

  // Add slots equivalent to the length of arguments myUnshift accepts.
  arr.length += argumentsLen;
  var len = arr.length;

  // Shift existing items of the arr to the right, leaving slots in the beginning of the array.
  for (var i = len - argumentsLen - 1; i >= 0; i--) {
    arr[i + argumentsLen] = arr[i];
  }

  // Inserting elements from arguments to the empty slots in the beginning of the array.
  for (var j = 0; j < argumentsLen; j++) {
    arr[j] = arguments[j + 1];
  }
  return len;
}

var arr = [1, 2, 3, 3, 4, 5];
console.log(myUnshift(arr, "a", "b", "c", "d", "e"));
