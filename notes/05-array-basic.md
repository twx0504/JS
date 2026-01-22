# 06-Array & Array API

Primitive Data Types: String, Number, Boolean, Undefined, Null, Bigint, Symbol

Reference Data Types: Object, Array, Function, ...

## 6.1 Basics of Array

- An ordered collection/ list of items.
- every programming language has built-in arrays.

> Using array:
> - relationship between values becomes clear.
> - easy to manage and operate.


```js
// Not reasonable. Relationship between each variable is not clear. Cumbersome to handle and operate.
var a0 = 99, a2 = 98, a3 = 90, a4 = 96, a5 = 80;

// An array of score.
var score = [99, 98, 90, 96, 80];

```

### 6.1.1 Creating an Array

1. through `array literal`.

```js
var arr = []; // []
var arr = [1, 2, 3]; // [1, 2, 3]
```

2. through `constructor`.

```js
var arr = new Array(5); // [empty x 5]
var arr = new Array(5, "2"); // [5, "2"]
var arr = new Array('5', 1, true, undefined); // ['5', 1, true, undefined]
```
> one argument that is number, it refers to array length.
> one or more arguments, they are array items.

### 6.1.2 Accessing Array Items

- index starts with 0.

```js
// Accessing item at particular index.
arr[index];

```
### 6.1.3 Length

> - the number of items in an array.
> - the index of the last item is `length - 1`.

### 6.1.4 Modify Values of Array Items

```js
// Modifying the value of item at a particular index.
arr[index] = newValue;

// Skipping indices creates empty slots.
arr[5] = 5;
console.log(arr); // [1, 2, 3, 'I changed!', 5]

// Assigning value to a distant index expands the array and introduces empty slots.
arr[10] = 10;
console.log(arr); // [1, 2, 3, 'I changed!', empty, 5, empty × 4, 10]

```

> How do you add a new item to the end of the array?
>`arr[arr.length] = newValue;`

### 6.1.5 Precautions

1. Accessing non-existent index returns undefined.

```js
var arr = [1, 2, 3, 4];
console.log(arr[10]); // undefined
```

2. Accessing empty slot returns undefined.

```js
var arr = [1, , 2, 3];
console.log(arr[1]); // undefined
```
> Note: Empty is different than undefined!

3. Difference of the following arrays:

```js
// Standard
var arr1 = [1, 2, 3];
console.log(arr1); // [1, 2, 3]

// Trailing comma (No effect)
var arr2 = [1,2,3,];
console.log(arr1);  // [1, 2, 3]

// Creating a sparse array.
var arr3 = [1, 2, 3, ,];
console.log(arr1);  // [1, 2, 3, empty]
```

> A sparse array is an array containing empty slots.

4. Changing arr.length will affect the array.

```js
var arr = [1, 2, 3, 4, 5];
// Clearing array
arr.length = 0;
console.log(arr); // []

// Add empty slots
var arr2 = [1, 2, 3, 4, 5];
arr2.length = 10;
console.log(arr2); // [1, 2, 3, 4, 5, empty * 5]

// Remove items
var arr3 = [1, 2, 3, 4, 5];
arr3.length = 3;
console.log(arr3); // [1, 2, 3]

```

### 6.1.6 Traversal in Array

> process of accessing each element / item of an array sequentially.
> to perform some operations.

#### 6.1.7 2D Array

```js
var arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Accessing 2D Array

arr[i]; // Accessing each item of the outer array.
arr[i][j]; // Accessing each item of the inner array.


// 2D Array Traversal
for (var i = 0; i < arr.length; i ++) {
  for (var j = 0; j < arr[i].length; j ++) {
    console.log(arr[i][j]);
  }
}

```
### 6.1.8 Array Type Checking

> typeof has its limitation.
> typeof [] -> 'object'
> typeof {} -> 'object'
> `Array.isArray(arr)` is a reliable way to check the type of array.
> it works with array instance coming from another realm e.g., iframe.

```js
var arr = [1, 2, 3];
Array.isArray(arr); // true

arr instanceof Array; // true -> Note: if the Array is coming from other realm like iframe, it returns false.

```
### 6.1.9 Applications

> **reverse**
> - starts from arr.length - 1
> - method 1:
> - var newArr = [];
> - `newArr[newArr.length] = item`
> - method 2 (without newArr)
> - swapping
>

> **max**
> - `var max = arr[0]`
> - compare max with other items

> **delete**
> - the item following the deleted item is moving one index forwards.
> - remove the last slot by `arr.length - 1`
> - starts the outer loop iteration again from the index where the last delete was.
> - **note:** If possible, do not delete items from an array as it could be a O(n^2) operations.

> **Extra:**
> the methods that we encapsulated based on Js is based on our understanding of the its concept.
> - native code can directly monify the memory, but the ones we created using Js do not have the abilities.
> - It is better to use the built-in methods provided rather than using the one we encapsulated.

## 6.2 Primitive vs Reference Data Types

> code snippet 1
```js
var a = 10;
var b = a;
a = 20;
console.log(a); // 20
console.log(b); // 10
```
> code snippet 2

```js
var arr1 = [1, 2, 3, 4];
var arr2 = arr1; // storing the reference of arr1
arr1[0] = "A";
console.log(arr1[0]); // 'A'
console.log(arr2[0]); // 'A'
```
> This is due to how primitive and reference data types are stored in memory.

### 6.2.1 The Storage of Primitive Data Types

> stores in stack.
![stack](stack.png)

### 6.2.2 The Storage of Reference Data Types

> involves stack memory and heap memory.
> stack memory: store the memory address.
> heap memory: store the actual data.

![reference](reference.png)

> note: 
> - variable b stores the same address as variable a, which leads to same data in heap memory.

### 6.2.3 Summary

> stack memory
> - fixed size, determined during compiled time, and is allocated during runtime.
> - store primitive data types or the heap addresses of reference data types.
> - access by value: read the data directly from stack.
> - small memory space, higher execution efficiency due to contiguous allocation (continuous space in memory).
> - ordered storage, follows First In Last Out principle.

> heap memory
> - dynamic size, decided during run time.
> - store the reference data type.
> - access by reference: read / retrieve the address from stack and look up the actual data in the heap.
> - large memory space, slower execution efficiency.
> - unordered storage, it can be obtained based on a reference / address.

> Analogy:
> - stack memory is like a drawer (very small).
> - heap memory is like a store (very big).
> - we can find things quickly in small space (stack), harder in large space (heap). => execution efficiency.

| Comparison                                                  | Primitive                              | Reference                                     |
| ----------------------------------------------------------- | -------------------------------------- | --------------------------------------------- |
| Where is the data stored?                                   | stack                                  | heap                                          |
| What does the variable hold?                                | value                                  | address                                       |
| What happens when assigning a variable to another variable? | copy value                             | copy reference                                |
| What are the storage size?                                  | small (primitive data size is smaller) | large (reference data type is larger in size) |

### 6.2.4 Deep Copy and Shallow Copy

> Question: How could we copy a reference type, and the copied version is independent of the original one?

> Shallow copy: copy the first layer. When encounter reference types, copy its reference / heap address.
> Deep copy: copy all layers, including inner reference data types.

> Deep copy requires recursion.