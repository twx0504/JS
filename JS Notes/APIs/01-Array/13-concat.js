/**
 * Array.prototype.concat(...valuesN)
 *
 * - concatenate two or more values (e.g., array / other types)
 * - do not mutate original array.
 *
 * Return value: new array (shallow copy) of concatenation result.
 */

var arr1 = [1, 2, 3];
var arr2 = ["a", "b", "c", "d"];
var arr3 = [0, 1, 2, 3, 4, 5];
var arr4 = [0, [3, 2]];
var arr = arr1.concat(arr2);
console.log(arr);
console.log(arr1);
console.log(arr2);

// Concat more than two arrays.
var newArr = arr1.concat(arr2, arr3);
console.log(newArr);

// return a shallow copy!
var newArr2 = arr1.concat(arr4);
newArr2[4][2] = "X";
console.log(newArr2);
console.log(arr4);

// Concatenate values to arr1.
var newArr3 = arr1.concat("Apple", "Orange", arr2);
console.log(newArr3);

function myConcat() {}
