# Iterator

## 01: Iterator Design Pattern

- **What is the iterator design pattern?**
  - A behavioral design pattern that provides a way to traverse a collection sequentially, **without exposing its internal structure**.
  - Analogy: like a TV remote — we press "next channel" to move forward, without knowing how the TV works internally.

- **Difference between iterator design pattern and iterator**
  - **Iterator design pattern**: the conceptual model (a design approach) for sequential traversal without revealing internal details.
  - **Iterator**: the concrete implementation of that design pattern (e.g., JavaScript’s iterator protocol).

- **Types of iterators**
  - **External Iterator**: Client controls the iteration.
    - Example: `Symbol.iterator` returning an iterator with `next()`.
    - Advantage: more flexible (pause, resume, custom traversal).
  - **Internal Iterator**: Client delegates control to the collection.
    - Example: `forEach`, `map`, `filter`.
    - Advantage: simpler; Disadvantage: less flexible (cannot use `break` or `continue`, though `return`/`throw` still work inside callbacks).

- **Implementation of Iterators**

**Internal Iterator**
```js
const arr = [2, 4, 6, 8];

Array.prototype._forEach = function(callback){
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

arr._forEach(function(item, index, arr){
    console.log(item, index, arr);
})

// However, the internal iterator like forEach is not flexible. 
// In case I would like to compare two arrays, forEach is not able to do that.

Array.prototype._compare = function(arr2){
    if (this.length !== arr2.length) throw new Error("Both arrays are not identical.");
    this.forEach(function(item, index){
            if (item !== arr2[index]) {
                throw new Error("Both arrays are not identical");
            }
        })
    console.log("Both arrays are identical.");
}
const arr2 = [2, 4, 6, 8];
const arr3 = [1, 2];
arr._compare(arr2); // Both arrays are identical.
arr._compare(arr3); // Uncaught Error: Both arrays are not identical.
```

**External Iterator**

```js

// V1: Unable to work with while loop. There's no way to check the termination condition.
Array.prototype.getIterator = function(){
    let i = 0;
    const that = this;
    return {
        next(){
            return that[i++];
        }
    }
}

// V2: Adding isDone, now it is working fine with the while loop.
// Do remember that in order to use keywords like continue, break, throw, return etc, 
// the value of iter.next() must be stored in a variable.

Array.prototype.getIterator = function(){
    let i = 0;
    const that = this;
    return {
        // You can add necessary methods here.
        isDone(){
            return i >= that.length;
        },
        next(){
            if (!this.isDone()){
                return that[i++];
            }
        }
    }
}

// V3: Make next method returns an object.
Array.prototype.getIterator = function(){
    let i = 0;
    const that = this;
    return {
        isDone(){
            return i >= that.length;
        },
        next(){
            if (!this.isDone()){
                return {
                    value:  that[i++],
                };
            }
        }
    }
}

// V4: Add done property to the next returned object.
Array.prototype.getIterator = function(){
    let i = 0;
    const that = this;
    return {
        isDone(){
            return i >= that.length;
        },
        next(){
            if (!this.isDone()){
                return {
                    value:  that[i++],
                    done: false, // iteration not completed yet
                };
            } else {
                return {
                    value: undefined,
                    done: true, // iteration completed
                }
            }
        }
    }
}
```

**Stack**

```js

class Stack {
    #data = [];
    #length;
    constructor(length){
        this.#length = length;
    }

    get length (){
        return this.#length;
    }

    isEmpty(){
        return this.#data.length === 0;
    }
    isFull(){
        return this.#data.length === this.#length;
    }
    push(item){
        if (this.isFull()) {
            throw new Error("The stack is full.");

        }
        this.#data.push(item);
        return this;
    }
    pop(){
        if (this.isEmpty()) {
            throw new Error("The stack is empty.");
        }
        return this.#data.pop();
    }
    getIterator(){
        let index = 0;
        const that = this;
        return {
            isDone(){
                return index >= that.#data.length;
            },
            next(){
                if (!this.isDone()) {
                    return {
                        value: that.#data[index++],
                        done: false,
                    }
                } else {
                    return {
                        value: undefined,
                        done: true,
                    }
                } 
            } 
        }
    }
    forEach(callback){
        for (let i = 0; i < this.#data.length; i++) {
            callback(this.#data[i], i, this);
        }

        // Note: you can also use the external iterator here to implement the internal iterator. The downside is that it has no access to the index.

        // const iter = this.getIterator();
        // while (!iter.isDone()) {
        //   callback(iter.next().value);
        // }
    }
}
```

**Separating the Data Class from the Iterator Class**

```js
// Iterator class
class DataIterator{
    #data;
    #index = 0;
    constructor(data){
        this.#data = data; // By default, DataContainer stores the reference. If immutability is needed, use [...data] or data.slice() for a shallow copy.
    }   
    isDone(){
        return this.#index >= this.#data.length;
    }
    next(){
        if (!this.isDone()) {
            return {
                value: this.#data[this.#index++],
                done: false,
            }

        } else {
            return {
                value: undefined,
                done: true,
            }
        }
    }
}

// This class is used to mimick a data type.
class DataContainer{
    #data;
    constructor(data){
        if (Array.isArray(data)) {
            this.#data = data;
        } else {
            throw new Error("Data is not an array.");
        }
    }

    // Create an iterator object with next method.
    getIterator(){
        return new DataIterator(this.#data);
    }

    // ... You can add more instance methods here.
}

```

## 02: Iteration Protocol

> - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

### 2.1 The Iterable Protocol

- define how an object should behave when used in iteration constructs e.g., for...of, spread operator, destructuring.
- An iterable is an object that must implement `[Symbol.iterator]` method.
- This method returns an **iterator** that follows the iterator protocol (an object with next method).
- `[Symbol.iterator]` method can be defined directly on the object, or inherited via the prototype chain.


```js

class MyIterable {
    [Symbol.iterator](){
        // .... implementation
    }
}
```

**Iterable Iterators:**
- Iterator can also be made iterable by implementing `[Symbol.iterator]` that return `this`.
- Since most JavaScript syntaxes (like for...of, spread, destructuring, Promise.all, etc.) expect iterables, it’s practical to design iterators to also be iterable.
- This is why most built-in iterators are also iterables.

```js
// Iterable Iterator
const myIterator = {
    next(){
        // ...
    },
    [Symbol.iterator](){
        return this;
    }
}

```

### 2.2 The Iterator Protocol

- An iterator is an object that implement `next` method that returns an object conforming to the IteratorResult interface.

```js
// An object that conforms to the IteratorResult interface.
// done property: 
// - false: the iterator is still able to produce the next value in the sequence.
// - true: the iterator has completed its sequence.


class MyIterable {
    [Symbol.iterator](){
        // implementation detail...

        // returns an iterator conforming to the Iterator Protocol.
        // next method is a must.
        // return & throw is optional.
        return {
            next(value){

                // Handle passed value.
                // Usually, there's no value passed.
                if (value !== undefined) {
                    console.log(value);
                }
                // return value conforming to the IteratorResult interface.
                return {
                    value: "some value",
                    done: false, // or true
                }   
            },
            // Optional
            // It is invoked automatically when you are using break / return / throw.
            // Calling this method tells the iterator that the caller does not intend to make any more next() calls and can perform any cleanup actions.
            // When the JavaScript engine calls return() automatically (e.g., due to break in a loop), it always calls it without arguments. So value will be undefined unless you explicitly pass something when calling return() manually.
            return(value){
                return {
                    value: value,
                    done: true,
                }
            },
            // Optional
            // It is not invoked automatically.
            // Calling this method tells the iterator that the caller detects an error condition
            // exception is the error instance.
            // It is never called for cleanup purpose.
            throw(exception){
                return {
                    value: exception,
                    done: true
                }
            }
        }
    }
}

```

## 03: Iterator in JS

- In 2025, console.log(Iterator) does log something:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
  - Iterator is an abstract class. It must be extended before use.
  - Most built-in Iterators like ArrayIterator, SetIterator, MapIterators, etc extend from Iterator class.
- Before that, console.log(Iterator) throws an exception.
- You can find iterator from Array.prototype.
- `[Symbol.iterator]` is an external iterator that returns an iterator object with next method.
![Symbol.iterator](iterator.png)


**How to use iterator?**

```js
const arr = [1, 2, 3, 4];

// Symbol.iterator is an JS expression.
// It returns a built-in, unique symbol used to define the default iterator for an object.
const iterator = arr[Symbol.iterator](); // Create an iterator.

// #1: Invoking next method of the iterator.
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());


// #2: Working with while loop
let obj = iterator.next();
while(!obj.done) {
    console.log(obj.value);
    obj = iterator.next();
}
```

**Iteration Process:**

> - `[Symbol.iterator]` method is invoked.
> - An iterator object is obtained.
> - iterator.next() is repeatedly called.
> - until the iterator’s next() method returns an object with { done: true }.
> - The iteration is completed.

**Implementation of `Symbol.iterator` method**

```js

Array.prototype[Symbol.iterator] = function(){
    let index = 0;
    const that = this;
    return {
        next(){
            return index < that.length ? {
                value: that[index++],
                done: false,
            } : {
                value: undefined,
                done: true,

            }
            // if (index < that.length) {
            //     return {
            //         value: that[index++],
            //         done: false,
            //     }

            // } else {
            //     return {
            //         value: undefined,
            //         done: true,
            //     }
            // }
        }
    }
}
```

**Note: Iterators are stateful. When an iterator is consumed (its next method returns `{done: true}`), it cannot be reused! You must create a new iterator.**

## 04: Iterables in JS

- An object is iterable if it has a `[Symbol.iterator]` method that returns an iterator.
- Most built-in collection are iterables.
  - Array
  - String
  - Set
  - Map
  - TypedArray
  - NodeList
  - arguments
  - etc...
- Plain objects are not iterable by default because they do not implement `[Symbol.iterator]` method.

## 05: for...of loop

- A loop that iterates over values of an iterable object.
- Some built-in iterators are also iterables because their `[Symbol.iterator]` method returns the `iterator` itself.
- Work well with `continue`, `break`, `throw`, `return` keywords.
- **We rarely use iterator alone, we work with for...of loop a lot.**

**Syntax:**

```js
for (variable of iterable) {
    // statement
}

// The amount of implementation detail hid for you:
// let obj = iterator.next();
// while (!obj.done){
//     console.log(obj.value);
//     obj = iterator.next();
// }

```
**for...of with iterables**

```js
// Array
const arr = [1, 2, 3, 4];

for (const val of arr) {
    console.log(val);
}

// Set
const set = new Set([1, 2, 3, 4]);

for (const val of set) {
    console.log(val);
}

// Map (iterates [key, value] pairs by default)
const map = new Map([
    [1, "a"],
    [2, "b"],
    [3, "c"],
]);

for (const entry of map) {
    console.log(entry);
}

// arguments object
function sum(){
    let sum = 0;
    for (const val of arguments) {
        sum += val;
    }
    return sum;
}
console.log(sum(1, 2, 3, 4, 5));
```
**for...of with built-in iterators**

```js
const arr = [1, 2, 3, 4, 5];
const iter = arr[Symbol.iterator](); // ArrayIterator
for (const val of iter) {
    console.log(val);
}

// Array's keys, values, entries return iterators:

const arr = [2, 4, 6, 8];

// arr keys are indices.
for (const key of arr.keys()) {
    console.log(key);
}

for (const val of arr.values()) {
    console.log(val);
}

for (const entry of arr.entries()) {
    console.log(entry);
}

// Set's keys, values, entries return iterators:

const set = new Set(["a", "b", "c"]);

// set.keys is an alias for the set.values method
// for (const key of set.keys()) {
//     console.log(key);
// }

for (const val of set.values()) {
    console.log(val);
}

for (const entry of set.entries()) {
    console.log(entry);
}

// Map’s keys, values, entries return iterators:

const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
    ["d", 4],
]);

for (const key of map.keys()) {
    console.log(key);
}

for (const val of map.values()) {
    console.log(val);
}

for (const entry of map.entries()) {
    console.log(entry);
}
```

**Note: Iterators are stateful. When an iterator is consumed (its next method returns `{done: true}`), it cannot be reused! You must create a new iterator.**

```js

const arr = [1, 2, 3, 4];
const iter = arr[Symbol.iterator]();

for (const v of iter) {
    console.log(v);
}

// 1
// 2
// 3
// 4

for (const v of iter) {
    console.log(v);
}
// It doesn't produce anything.

```

**Make Objects as Iterables**

```js
const obj = {
    data: ["a", "b", "c"],
    [Symbol.iterator](){
        let index = 0;
        const that = this;
        return {
            next(){
                if (index < that.data.length) {
                    return {
                        value: that.data[index++],
                        done: false,
                    }
                } else {
                    return {
                        value: undefined,
                        done: true,

                    }
                }
            },
            // Make iterator also iterable.
            [Symbol.iterator](){
                return this; // this refers to this iterator object.
            }
        }
    }
}

const iter = obj[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

for (const v of obj) {
    console.log(v);
}

// a
// b
// c

// Note: Custom iterator is not iterable.
// Solution: Add [Symbol.iterator] method to the iterator and return `this`.
for (const v of iter) {
    console.log(v);
}
// a
// b
// c
```

## 06: Scenario Using Iterators

- for...of
- destructuring
- Set & Map constructor
- Array.from
- Promise.all
- Promise.race
- yield*


```js
// Let's see what would happens if we modify the [Symbol.iterator] of String prototype.

// Destructuring
// const [v1, v2, ...] = iterable
let str = "Hello";
const [a, b] = str;
console.log(a, b); // H e
console.log([...str]); // ['H', 'e', 'l', 'l', 'o']

String.prototype[Symbol.iterator] = function(){
    let index = 0;
    const that = this;
    return {
        next(){
            if (index < that.length) {
                return {
                    value: index++,
                    done: false,
                }
            } else {
                return {
                    value: undefined,
                    done: true,
                }
            }
        }
    }
}

let str2 = "Hello";
const [x, y] = str2;
console.log(x, y); // 0 1 - Look! The result has changed to indices!

// Internally, it is like this:
// const iter = str2[Symbol.iterator]();
// x = iter.next().value;
// y = iter.next().value;

console.log([...str2]); // [0, 1, 2, 3, 4] - the result has also changed.
```

## 07: Non-closable Iterator

- Since `return` method is optional, the iterator object of Array, Map, Set, String, etc do not have `return` method.
- When a for...of encounters `break`, `return`, or `throw`, the iterator will not be closed.
- If an iterator is not closed, it can continue iterating from where it left off.

```js
const arr = [1, 2, 3, 4];
const iter = arr[Symbol.iterator]();
for (const v of iter) {
  if (v === 3) {
    break;
  }
  console.log(v);
}

// 1
// 2

// Iterator not closed → can continue iteration from where it left off.
for (const v of iter) {
  console.log(v);
}
// 4

```

## 08: Comparison: for, forEach, for...in, & for...of

```js
const arr = [1, 2, 3, 4];

// #1: for loop
// Requires knowledge of the array’s internal structure: 
// - length property
// - index-based access (arr[i])
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
// 1 2 3 4


// #2: forEach
// Available on Array, TypedArray, Set, and Map.
// Always iterates in insertion order.
// Callback signatures differ by collection type:
//   - Array / TypedArray → forEach((element, index, array) => {})
//   - Set → forEach((value, valueAgain, set) => {})  // key === value
//   - Map → forEach((value, key, map) => {})
// Cannot use control-flow keywords (break, continue, return) to exit early.
arr.forEach(function(val) {
    console.log(val);
});
// 1 2 3 4


// #3: for...in
// Iterates over all enumerable string keys of an object,
// including inherited properties up the prototype chain.
// Not recommended for arrays (order is not guaranteed,
// and extra properties also show up).
arr.abc = "abc";
Array.prototype.test = "test";
for (const prop in arr) {
    console.log(arr[prop]);
}
// 1 2 3 4 abc test


// #4: for...of
// The cleanest way to iterate over *iterables* (Array, String, Set, Map, etc).
// Does not expose internal structure (no indices or keys unless you ask).
for (const val of arr) {
    console.log(val);
}
// 1 2 3 4
```

## 09: The Importance of Iterators

1. Give us a convenient and unified way for accessing different types of data structure / collections.
2. Traverse elements in sequential order.
3. Work with for...of loop and other constructs (spread operator, destructuring, etc...) that expects iterables.