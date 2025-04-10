/**
 * Array.prototype.push(element, ...elementsN)
 *
 * push one or more elements to the end of the array.
 *
 * push push the element to the end based on length.
 *
 * return value: the new length of the arr.
 */

var arr = [1, 2, 3, 4];

// Push single item.
arr.push(5);
console.log(arr);

// Push multiple items
arr.push(6, 7, 8, 9);
console.log(arr);

// Return value of arr.push() is the new length.
console.log(arr.push(10)); // 10

arr.push();
console.log(arr);

/* My implementation: */
function myPush(arr) {
  for (var i = 1; i < arguments.length; i++) {
    arr[arr.length] = arguments[i];
  }

  return arr.length;
}

var arr2 = [1, 2, 3];
myPush(arr2, 1, 2, 3, 4, 5, 6, 7, 8);
console.log(arr2, arr2.length);
