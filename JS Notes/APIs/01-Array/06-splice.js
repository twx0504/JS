/**
 * Array.prototype.splice(index, deleteCount, ...elementsN)
 *
 * - modify the content of an array - adding, deleting, replacing.
 */

/* Add */
var arr = [1, 2, 3, 4, 5];

arr.splice(2, 0, "A"); // Add element to a specific index.
console.log(arr); // [ 1, 2, 'A', 3, 4, 5 ]

arr.splice(arr.length, 0, "A", "B", "C"); // Adding to the end of the array.
console.log(arr);

/* Delete */

var arr2 = [1, 2, 3, 4, 5];
arr2.splice(2, 3); // Delete n elements start from index.
console.log(arr2); // [ 1 , 2 ]

arr2.splice(-1, 1);
console.log(arr2); // [1]

arr2.splice(0, -3); // when deleteCount < 0, it is treated as 0, meaning that no deletion.
console.log(arr2); // [1]

/* Update */

var arr3 = [1, 2, 3, 4, 5];
console.log(arr3.splice(2, 1, "A")); // Replace index 2 element with 'A'. Return [ 3 ] the deleted element.
console.log(arr3); // [ 1, 2, 'A', 4, 5 ]

console.log(arr3.splice(0, 5, "u", "v", "w", "x", "y")); // Replace multiple elements. Return [ 1, 2, 'A', 4, 5 ]
console.log(arr3); // [ 'u', 'v', 'w', 'x', 'y' ]

arr3.splice(3, 2, "A", "B", "C", "D");
console.log(arr3); // ['u', 'v', 'w', 'A', 'B', 'C', 'D']

function mySplice(arr, insertIndex, deleteCount) {

    deleteCount = deleteCount || 0;
    if (deleteCount === 0) {

    }
    // arguments
    // Add when deleteCount = 0
    // Replace when deleteCount !== 0 -> arr.length shift
    // Delete -> when arguments.length === 0, & arr.length -= something + deleteCount
    // return deleted item in the form of arr.

}
