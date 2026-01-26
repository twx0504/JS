# Async Await

- Purpose: A synthatic sugar to consume promise-based APIs.
- Async Await is similar to promises + generators.


## 01 `Async`

- Define an async function
- Return a resolved promise with value returned by the async function
- Return a rejected with an exception uncaught within the async function
- Wrap return value in a promise (Similar to `return Promise.resolve(val)`) if the return value is not a promise
- Allows zero or more await expressions inside an async function
  - If no await, fully synchronous
  - If await exists, synchronous until the first await, and the rest of code is completed asynchronously
  - Every await creates an async boundary (execution pauses, control returns to the caller, and the rest of the code is scheduled to run later via a microtask)

```js

// Define Async functions
async function foo() {}

const bar = async function() {}

const baz = async () => {}


// Return Values

async function qux() {
    // return undefined; // Default (Similar to return Promise.resolve(undefined))
}

async function quux() {
    return Promise.resolve(promise); // Note: Unlike Promise.resolve(promise) that always returns the same reference, the async function will always return a new reference.
}

```

## 02 `Await`

- Only allows in async functions
- Doesn't block the main thread
- Wait and get the fulfillment value if a promise is fulfilled
- Throw the rejected value if a promise is rejected
- The value after await will be converted to a promise if the value is not a promise (Similar to `Promise.resolve`)


```js
// await expression;

function sleep(time, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, time)
    })
}

const thenable = {
    then(resolve) {
        resolve("c");
    }
}

async function foo() {
    // Promise 
    const a = await sleep(2000, "a");
    console.log(a);
    // Non-thenable value: "b" will be wrapped in a already-fulfilled promise, as if Promise.resolve("b")
    const b = await "b";
    console.log(b);
    // Thenable: then() is called
    const c = await thenable;
    console.log(c);
}

// Control flow:
//
// 1. First await:
// - The await expression is evaluated (synchronously / immediately).
// - The async function is paused at the await point.
// - Control exits the function and returns to the caller
//   (here, the caller is the global code / whoever invoked the function).
// - The continuation (the rest of the function after this await)
//   is scheduled as a microtask to run after the awaited value settles
//   and after any already-queued microtasks.
//
// 2. Second await:
// - The same process repeats: evaluate expression → pause → return to caller
//   → schedule the next continuation as a microtask.
//
// 3. Third await:
// - Same pattern again.

// Conceptually, it is similar to:
function foo() {
  return Promise.resolve(sleep(2000, "a"))
    .then(a => {
      console.log(a);
      return Promise.resolve("b");
    })
    .then(b => {
      console.log(b);
      return Promise.resolve(thenable);
    })
    .then(c => {
      console.log(c);
      // Here implicitly return undefined; // return Promise.resolve(undefined)
    });
}
```