# Promises

## 01 Introduction

## 02 Promise Constructor

> - create a promise instance - it is usually used to wrap callback-based API e.g., setTimeout.
> - executor callback is run `synchronously` as soon as the promise instance is created.
> - two arguments are passed into the executor callback, calling one of them changes the PromiseState.
> > - `resolve(value)`: the promise instance becomes fulfilled - `pending -> fulfilled`.
> > - `reject(reason)`: the promise instance becomes rejected - `pending -> rejected`.
> - Once a Promise is settled (`fulfilled` or `rejected`), its state cannot be changed again. 
> - Any subsequent calls to `resolve` or `reject` are ignored.

```js

new Promise(executor);

new Promise((resolve, reject) => {});

```

**resolve(value) behaviour:**
> - if value is a promise or thenable, the promise instance will adopt its state and result.
> - `the outer promise follows the inner promise` - it becomes fulfilled or rejected exactly as the inner does.

```js
// 1. without passing value.
const p1 = new Promise((resolve, reject) => {
  resolve(); // similar to resolve(undefined)
}); 
// Promise {<fulfilled>: undefined}

// 2. passing plain value.
const p2 = new Promise((resolve, reject) => {
  resolve(3);
}); 
// Promise {<fulfilled>: 3}

// 3. passing a promise as value.
const p3 = new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    // p3 state depends on resolve or reject that is called.
    resolve("The operation has succeeded.");
    // reject("The operation has failed.");
  }));
});
// Promise {<fulfilled>: 'The operation has succeeded.'}

// 4. passing a thenable object.
const thenableObj = {
    then(onFulfilled, onRejected){
        // p4 state depends on onFulfilled or onRejected that is called.
        onFulfilled(10);
        // onRejected(1111);
    }
}
const p4 = new Promise((resolve, reject) => {
  resolve(thenableObj); 
  // similar to
  //   resolve(new Promise((resolve, reject) => {
  //     thenableObj.then(resolve, reject);
  //   }))
});
// Promise {<fulfilled>: 10}
```

**reject(reason) behaviour:**
> - Unlike resolve(), reject() do not adopt / unwrap the reason passed.
> - reject is quite similar to throw.

```js
// 1. without passing value.
const p1 = new Promise((resolve, reject) => {
    reject();
}); 
// Promise {<rejected>: undefined}

// 2. passing plain value.
const p2 = new Promise((resolve, reject) => {
    reject(10);
}); 
// Promise {<rejected>: 10}

// 3. passing a promise.
const p3 = new Promise((resolve, reject) => {
    // this promise instance is passed to the second callback of then() OR callback of catch().
    reject(new Promise((resolve, reject) => {
        resolve(1000);
    }));
});
// Promise {<rejected>: Promise}

// 4. passing a thenable.
const thenableObj = {
    then(onFulfilled, onRejected){
        // p4 state depends on onFulfilled or onRejected that is called.
        onFulfilled(10);
        // onRejected(1111);
    }
}
const p4 = new Promise((resolve, reject) => {
    // this thenable is passed to the second callback of then() OR callback of catch() as is.
    reject(thenableObj);
});
// Promise {<rejected>: thenableObj} 
```

**throw in executor**
> - the promise becomes rejected. `pending -> rejected`

```js
const p = new Promise((resolve ,reject) => {
    throw new Error("The operation has failed.");
});
// Promise {<rejected>: Error: The operation has failed.}


const p2 = new Promise((resolve, reject) => {
  resolve("ok");
  throw new Error("This will be ignored"); // ignored - the promise state has already become fulfilled. Throwing error to make it rejected again doesn't work.
});
// Promise {<fulfilled>: 'ok'}
```

**return statement in executor**
> - return statement in executor is ignored.
> - it is used to exit the function body.
> - it doesn't affect the created Promise's result at all.

```js

// 1. Without using return with resolve() / reject()
const p1 = new Promise((resolve, reject)=>{
    resolve(1);
    // Since resolve() alone doesn't exit the function body, the following lines of code are executed.
    console.log(2);
    // Any throw() inside executor is automatically caught by the Promise constructor.
    // The Promise runs the executor inside a hidden try...catch, something like the following:
    // try {
    //     executor(resolve, reject);
    // } catch (err) {
    //     reject(err)
    // }
    // but since resolve() has been called earlier, the this implicit reject() has no effect (ignored).
    throw new Error("Operation has failed.");
    
});

// Using return with resolve() / reject() - recommended because resolve / reject doesn't exit the function body by default.
const p2 = new Promise((resolve, reject)=>{
    return resolve(2);
    // the following code never reach because the function body has been exited due to return.
    console.log(2);
    throw new Error("Operation has failed.");
});
```

## 03 Promise Instance Methods

> - `then`, `catch`, `finally` each returns a new Promise instance, whose state and result depend on the return value of the callback.
> - the schedule task belongs to microtask.
> - synchronous code > microtask (promise) > macrotask (setTimeout)


### 3.1 `then(onFulfilled[, onRejected])` 

> - schedule a callback to be executed asynchronously when the promise is settled (either fulfilled or rejected).
> - onFulfilled is executed when the promise is **fulfilled**.
> - onRejected is executed when the promise is **rejected**.
> - return a new promise.

**Syntax:**

```js
promise.then(onFulfilled[, onRejected]);
promise.then((data) => {}, (err) => {});
promise.then((data) => {});

// Note: 
// - if onFulfilled / onRejected is not a function.
// - onFulfilled is replaced by identity function (x) => x.
// - onRejected is replaced by thrower function (err) => { throw err}.
// e.g., promise.then(1, 2); it is the same as promise.then(data => data, err => {throw err}).
```

**then() method's return behaviour:**
> - the promise returned by `then` method depends on the return value of the handler that is called.

```js
const p = new Promise((resolve, reject) => {
    resolve(10);
});

// 1. without return anything, the returned promise is fulfilled with undefined.
p.then((data)=>{
    // similar to:
    // return undefined;
});

// 2. return plain value, the returned promise is fulfilled with that return value.
p.then((data)=>{
    return 1;
});

// 3. Return a promise. The promise returned by .then() adopts the state and result of the promise returned from the handler.
// - Simply put, the outer promise adopts the inner promise's state and result.
// Note: The promise returned by .then() is NOT the same object as the promise returned inside the handler.
p.then((data)=>{
    return new Promise((resolve, reject) => {
        resolve("Operation succeeded.");
        // reject("Operation failed.");
    })
});

// 4. return thenable
// - thenable is an object with a then() method defined.
// - the promise returned by then() method adopts the state and result based on how the thenable's then() method calls onFulfilled / onRejected.
const thenable = {
    then(onFulfilled, onRejected){
        onFulfilled("Operation succeeded.");
        // onRejected(new Error("Operation failed."))
    }
}
p.then((data)=>{
    return thenable;
    // similar to
    // return new Promise((resolve, reject) => {
    //     thenable.then(resolve, reject);
    // });
});
```

**Return rejected promise from then():**

```js
const p = new Promise((resolve, reject) => {
    resolve(1);
});
// 1. throw exception
p.then((data) => {
    throw new Error("Operation has failed.")
});
// 2. return a rejected promise
p.then((data) => {
    return new Promise((resolve, reject) => {
        reject(new Error("Operation has failed."));
    })
});
// 3. return a thenable that calls onRejected in then() method.
const thenable = {
    then(onFulfilled, onRejected){
        onRejected(new Error("Operation has failed."))
    }
}
p.then((data) => {
    return thenable;
});

// 4. return Promise.reject()
p.then((data) => {
    return Promise.reject(new Error("Operation has failed."));
});
```

### 3.2 `catch(onRejected)`

> - alias of p.then(null, (err) => {})
> - catch() is called if promise is **rejected**.
> - return a new promise.
> - return behaviour and how to create rejected promise from then() refers to `then`.

```js
const promise = new Promise((resolve, reject) => {
    reject(new Error("The operation has failed."));
});

promise.catch((err) => {});
// promise.catch is alias of promise.then(null, (err) => {});
```

### 3.3 `finally(onFinally)`

> - schedule a callback to be called when the promise is settled (either fulfilled or rejected).
> - for cleanup (hiding loading spinners, closing connections, clear timers, etc).
> - return a new promise.


```js
const promise = new Promise((resolve, reject) => {
    reject(new Error("The operation has failed."));
});

// Note: onFinally callback doesn't receive an argument.
promise.then((data) => {}).finally(()=>{});
promise.then((data) => {}).catch((err) => {}).finally(()=>{});
promise.catch((err) => {}).finally(()=>{});
promise.finally(()=>{});
```

**Finally is transparent:**
> - ignore onFinally return value, unless it is rejected (rejected promise / thenable that eventually rejects).
> - new promise adopts the previous state unless onFinally throws / rejects.

```js
const p = new Promise((resolve, reject) => {
    resolve("The operation has succeeded.");
});

p.finally(() => {
    console.log("Finally ...");
    // return value inside onFinally is ignored.
    // the promise that is returned adopts the previous state (fulfilled / rejected) and result.
    // unless it is a rejected promise / thenable that eventually rejects.
}).then((data) => {
    console.log(data);
})
```

## 04 Promise Static Methods

### 4.1 `Promise.resolve(value)`

> - return a promise fulfilled with value.
> - flattens nested layers of Promise / Thenable => The resulting promise that fulfills to non-thenable value.

```js
Promise.resolve(10);

// Quite similar to
// new Promise((resolve, reject) => {
//     resolve(10);
// })

```

**Value Passed into Promise.resolve:**

```js

// 1. without value
const p = Promise.resolve(); // Promise {<fulfilled>: undefined}

// 2. plain value
const p = Promise.resolve(123); // Promise {<fulfilled>: 123}

// Similar to:
// new Promise((resolve, reject) => {
//     resolve(123);
// });

// 3. promise - Promise.resolve reuses the existing Promise instance.
const p2 = new Promise((resolve, reject) => {
    resolve("Succeeded.");
    // reject(new Error("Failed."));
});
const p = Promise.resolve(p2); // Promise {<fulfilled>: 'Succeeded.'}
console.log(p === p2); // true

// 4. thenable - Promise.resolve will call the thenable's then method with two callback it prepares.
const thenable = {
    then(onFulfilled, onRejected) {
        // Note: throw exception causes the promise to be rejected.
        onFulfilled("Succeeded.");
        // onRejected(new Error("Failed."));
        // Note: throw exception after onFulfilled is ignored.
        
    }
}
const p = Promise.resolve(thenable); // Promise {<fulfilled>: 'Succeeded.'}

```

### 4.2 `Promise.reject(reason)`

> - return a promise rejected with a reason.
> - Unlike Promise.resolve, this static method always returns a new Promise.

```js
Promise.reject(new Error("Operation has failed."));

// Quite similar to
// new Promise((resolve, reject) => {
//     reject(new Error("Operation has failed."));
// })

```

**Value Passed into Promise.reject:**

```js
// 1. without value
const p = Promise.reject(); // Promise {<rejected>: undefined}

// 2. plain value
const p = Promise.reject(123); // Promise {<rejected>: 123}


// 3. promise
const p2 = new Promise((resolve, reject) => {
    resolve("Succeeded.");
});

const p = Promise.reject(p2); // Promise {<rejected>: Promise}
console.log(p === p2); // false - the return promise is a new promise, it doesn't reuse p2.

// 4. thenable returns as it is.
const thenable = {
    then(onFulfilled, onRejected) {
        onFulfilled(10);
    }
}
const p = Promise.reject(thenable); // Promise {<rejected>: thenable}
```


### 4.3 `Promise.any`

> takes an iterable and return a single prx
> It is fulfilled with the value of the first fulfilled promise.
> It is rejected with AggregateError if all of the input promiss rejected.

```js

// Promise.any(iterable);

const p1 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p1 is done.");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p2 is done.");
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p3 is done.");
  }, 3000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(function () {
    reject("p4 is rejected.");
  }, 500);
});

Promise.any([p1, p2, p3, p4])
.then((data) => {
  console.log("Success:", data);
})
.catch((err) => {
  console.log("Failure:", err);
});

console.log(Promise.any([p1, p2, p3, p4]));

// Promise {<fulfilled>: "p1 is done."}
// Success: p1 is done.


// If iterable is empty, the returned promise is rejected.
const p = Promise.any([new Promise((resolve, reject) => {reject(1)}), new Promise((resolve, reject) => {reject(3)})]); // Promise {<rejected>: AggregateError: All promises were rejected}
p.catch(err => {
  console.log(err); // AggregateError: All promises were rejected
  // Accessing the AggregateError instance.
  console.log(err.errors); // [1, 3]
  console.log(err.name); // AggregateError
  console.log(err.message); // All promises were rejected
});
```

### 4.4 `Promise.all`

> - takes an iterable and returns a single promise that fulfills with an array of fulfillment values when all the input promises have fulfilled.
> - returns a rejected promise if any of the input promises reject with the first rejected reason.
> - use when the asynchronous tasks are dependent on each other or immediately reject if any of them rejecting.

```js
// Promise.all(iterable)
const p1 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p1 is done.");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p2 is done.");
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p3 is done.");
  }, 3000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(function () {
    reject("p4 is rejected.");
  }, 1500);
});

const promise1 = Promise.all([p1, p2, p3]); // Promise {<fulfilled>: Array(3)}

const promise2 = Promise.all([p1, p2, p3, p4]); // Promise {<rejected>: 'p4 is rejected.'}

// If an empty iterable is passed, it returns a fulfilled promise.
const promise3 = Promise.all([]); // Promise {<fulfilled>: Array(0)}

```

### 4.5 `Promise.allSettled`

> - takes an iterable and return a single promise that always fulfills with an array of objects describing each promise outcome when all of the input promises settled (fulfilled or rejected)


```js
// Promise.allSettled(iterable)
const p1 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p1 is done.");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p2 is done.");
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p3 is done.");
  }, 3000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(function () {
    reject("p4 is rejected.");
  }, 1500);
});

const p = Promise.allSettled([p1, p2, p3, p4]); // Promise {<fulfilled>: Array(4)}

p.then((data) => {
  console.log(data);
  // [
  // {status: 'fulfilled', value: 'p1 is done.'},
  // {status: 'fulfilled', value: 'p2 is done.'},
  // {status: 'fulfilled', value: 'p3 is done.'},
  // {status: 'rejected', reason: 'p4 is rejected.'}
  // ]
});

// If an empty array is passed, it returns a fulfilled promise.
const p = Promise.allSettled([]); // Promise {<fulfilled>: Array(0)}

```
### 4.6 `Promise.race`

> - returns a promise that settles (fulfilled / rejected) based on whichever promise in the iterable settles first.
>  - Useful when you only care about which promise finishes first, regardless of whether it was fulfilled or rejected.

```js
// Promise.race(iterable);
const p1 = new Promise((resolve, reject) => {
  setTimeout(function () {
    reject("p1 is rejected.");
  }, 800);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p2 is done.");
  }, 500);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("p3 is done.");
  }, 1000);
});

// settles: fulfilled / rejected
// p2 (500ms) wins the race because it settles faster than p1 (800ms).
const promise1 = Promise.race([p1, p2]); // Promise {<fulfilled>: 'p2 is done.'}
// p1 (800ms) wins the race because it settles faster than p3 (1000ms).
const promise2 = Promise.race([p1, p3]); // Promise {<rejected>: 'p1 is rejected.'}


```

