# Generator Function & Generator

## 01: Generator Function

> - used to create GeneratorFunctionObject, which conforms to the iterator protocol.

```js
// gen is hoisted.
const it2 = gen();

// Declare a generator function.
// It is like a regular function that can be hoisted.
function* gen(){}

// Create a GeneratorFunction Object.
// It is a special kind of iterator.
// Calling Generator Function only return an iterator.
// Code inside the Generator Function will not be executed until the iterator next method is called.
const it = gen(); 
```

## 02: yield

> - used to pause and resume a generator function.
> - can only be used inside Generator Function.
> - cannot be used within nested functions as well.

```js
function* gen(){
    // -- Start of Function Body --
    yield 1; // First stop
    yield 2; // Second stop
    yield 3; // Third stop
    // -- End of Function Body --
}

const it = gen();
// Calling it.next method resume the execution of the Generator Function body to first yield statement.
console.log(it.next()); // {value: 1, done: false}
// Starting from the first yield statement, execute the function body to the second yield statement.
console.log(it.next()); // {value: 2, done: false}
// Starting from the second yield statement, execute the function body to the third yield statement.
console.log(it.next()); // {value: 3, done: false}
// Starting from the third yield statement, execute the function body to the end of the function body.
console.log(it.next()); // {value: undefined, done: true}

// Work with for...of loop
// GeneratorFunction Object is iterable.
for (const v of gen()) {
    console.log(v);
}

// 1
// 2
// 3
```


## 03: next method

> - return an object {value: xxx, done: yyy}
> - if value is provided as an argument, this value is send to the generator as the result of a yield expression.

```js
next();
next(value);
```

```js
function* gen(){
    // -- Start of Function Body --
    const a = yield 1; // First stop
    console.log("a = ", a);
    const b = yield 2; // Second stop
    console.log("b = ", b);
    const c = yield 3; // Third stop
    console.log("c = ", c);
    console.log("sum = ", a + b + c);
    // -- End of Function Body --
}

const it = gen();
// it.next(value)
// - value represents the returned value of previous yield.
// - Note: the value of the first next method is ignored
// - because there's no yield statement at the start of the function body.

console.log(it.next()); // {value:1, done: false}
console.log(it.next(10));
// "a = 10"
// {value:2, done: false} 
console.log(it.next(20));
// "b = 20"
// {value:3, done: false} 
console.log(it.next(30));
// "c = 30"
// "sum = 60"
// {value:undefined, done: true} 

```

## 04: yield*

> - delegate to another iterables.
> - can only be used inside Generator Functions.

```js

function* gen(){
    yield 1;
    yield* gen2();
    // Similar to:
    // for (const v of gen2()) {
    //     yield v;
    // }
    //
    // OR
    //
    // yield 2
    // yield 3
    // yield 4
    yield 5;
}

function* gen2(){
    yield 2;
    yield 3;
    yield 4;
}

const it = gen();
console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}
console.log(it.next()); // {value: 3, done: false}
console.log(it.next()); // {value: 4, done: false}
console.log(it.next()); // {value: 5, done: false}

function* gen3(){
    // Under the hood, yield* gets the iterator by calling the [Symbol.iterator] method.
    // Then calling the iterator next method one by one.
    yield* ["a", "b", "c"];
    // Similar to:
    // for (const v of ["a", "b", "c"]) {
    //     yield v;
    // }
}

for (const v of gen3()) {
    console.log(v);
}
// a
// b
// c

// rest parameter
function* gen4(...args) {
    yield* args;
}

for (const v of gen4(1,2,3,4)) {
    console.log(v);
}

// arguments
function* gen5() {
    yield* arguments;
}

for (const v of gen5(10, 20, 30)) {
    console.log(v); 
}

// Value of yield*
function* g1(){
    yield* [1, 2, 3];
    // delegate / pass control to g2 generator
    // and when g2 finishes, its return value will be assigned to g2Val.
    const g2Val = yield* g2(); 
    console.log(g2Val);
}
function* g2(){
    yield* [4, 5, 6];
    // When g2 completes, it returns this value.
    // That value will become the result of `yield* g2()` in g1.
    return "G2 Value"; 
}

for (const v of g1()) {
    console.log(v);
}
// 1
// 2
// 3
// 4
// 5
// 6
// G2 Value <-- comes from console.log inside g1, not from the loop
```

## 05: throw method & Global throw Statement

### 5.1 throw method

> - as if inserting throw exception at the current suspended position in the generation function body.

```js
throw();
throw(exception); // instance of Error / value.
```


> **No Error Handling:**

```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

const it = gen();
it.next(); // {value: 1, done: false}
it.throw(new Error("Error!")); // Uncaught Error: Error!
it.next(); // {value: undefined, done: true}
```

> **Outside Error Handling:**

```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

const it = gen();
it.next(); // {value: 1, done: false}
try {
    it.throw(new Error("Error!"));
} catch(e) {
    console.log(e); // Error: Error!
}
it.next(); // {value: undefined, done: true} // this means that the generator has closed.
// the rest of the script is running as normal.

```
> **Inside Error Handling:**
> - If calling throw() before the generator enters a try block, and there's no outside try...catch to handle the error, the rest of the script is not run anymore.
> - If the error is handled internally with try...catch, then resumes execution, throw() behaves like next() and returns {value, done}.

```js
function* gen(){
    yield 1; 
    try {
        yield 2; // Only after the second next method, the code will reach inside try block.
    } catch(e) {
        console.log(e);
        yield 3;
    }
    yield 4;
}

const it = gen();
it.next(); // {value: 1, done: false}
// it.throw(new Error("Error!")); 
// // Note: if throw is called at this point, it doesn't work because the try block is still not yet entered.
// // So, the generator is closed immediately.
// // The rest of the script is not run anymore.
it.next(); // {value: 2, done: false}
it.throw(new Error("Error!"));
// Error: Error!
// {value: 3, done: false} // Note: If Error is handled internally within the generator function, it will call next method and get the result.
it.next(); // {value: 4, done: false}
```

> **Both Inside & Outside Error Handling:**

```js
function* gen(){
    yield 1; 
    try {
        yield 2; // Only after the second next method, the code will reach inside try block.
    } catch(e) {
        console.log(e);
    }
    yield 3;
    yield 4;
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
try {
    it.throw(new Error("Error!"));
    // Error: Error!
    // {value: 3, done: false}
} catch(e) { // Since the Error is caught within the generator function, the external try...catch block will not catch the error.
    console.log(e);
}
it.next(); // {value: 4, done: false}

```
### 5.2 Global throw Keyword

> **External throw:**
> - immediately stop the script execution.
> - Unlike throw method, global throw outside the generator cannot be caught inside generator function.

```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
throw new Error("Error!"); // Uncaught Error: Error!
// The rest of the script is not run.
it.next();
```

> **Internal throw without Handling:**
> - stop the generator and script.
```js
function* gen(){
    yield 1;
    yield 2;
    throw new Error("Error!");
    yield 3;
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // Uncaught Error: Error!
// The rest of the script is not run.

```

> **Internal throw with Internal try...catch**

```js
function* gen(){
    yield 1; // First

    try {
        throw new Error("Error!");
        yield 2; // this code is never reached.
    } catch(e) {
        console.log(e); // Caught the exception and log.
        yield 3; // Second
    }
    yield 4; // Third
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next();
// Error: Error!
// {value: 3, done: false}
it.next(); // {value: 4, done: false}
```
> **Internal throw with External try...catch**
> - Internal throw without internal handling closes the generator immediately.
> - External try...catch can catch the error, but it doesn't resume the generator.
> - Any subsequent next call will return {value: undefined, done: true}
> - the rest of the code after the external try...catch continues to run as usual.

```js
function* gen(){
    yield 1; // First Pause Point
    yield 2; // Second Pause Point
    // Throw exception: no internal try...catch, so it will propagate outside
    throw new Error("Error!");
    // This line and beyond are NEVER reached because the exception stops the generator
    yield 3; // Third Pause Point
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
// The third call triggers the internal throw
try {
    it.next();
} catch(e) {
    console.log(e); // Error: Error! - log the exception.
}
// Further calls return done = true because generator is closed
it.next(); // {value: undefined, done: true} -  generator cannot yield anymore
```


## 06: return method & return Statement

### 6.1 return method

> - as if inserting return statement at the current suspended position in the generation function body.
> - finishes the generator.
> - can combine with try...finally block to perform some cleanup.

```js
return();
return(value);
```

> **Normal Usage without try...finally**

```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.return("cleanup"); // {value: 'cleanup', done: true} - this means the generator has closed.
// The subsequent next call always returns {value: undefined, done: true}
it.next(); // {value: undefined, done: true}

```

> **Generator hasn't reached the try block.**
> - Since the generator is not yet in the try block, the finally block is skipped when return() is called.

```js
function* gen(){
    yield 1;
    yield 2;
    try {
        yield 3;
    } catch(e) {
        console.log(e);
    } finally {
        yield 4;
        yield 5;
    }
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.return("cleanup"); // {value: 'cleanup', done: true}
it.next(); // {value: undefined, done: true}
```
> **Generator has reached the try block.**
> - The generator jump to the finally block.
> - Each yield in the finally is returned step by step for each next call.
> - After finally finishes, the generator is closed.
> - the value passed to return method is returned on the very last next().
```js
function* gen(){
    yield 1;
    yield 2;
    try {
        yield 3;
    } catch(e) {
        console.log(e);
    } finally {
        yield 4;
        yield 5;
    }
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
// Calling return when the current suspended position is in the try block of the generator function.
it.return("cleanup");
// {value: 4, done: false} 
// - Generator jumps to the finally block. 
// - Execution pauses at the first yield inside finally. 
// - Behaves exactly like calling next().
it.next(); // {value: 5, done: false} - the second yield in the finally block.
it.next();
// {value: 'cleanup', done: true} 
// - Finally block has finished. 
// - Generator is closed. 
// - The value passed to return() is returned here.

```

> **Generator is already inside finally block.**
> - Calling return() immediately closes the generator.
> - Any remaining code in the finally block is ignored.

```js
function* gen(){
    yield 1; // First pause point.
    yield 2; // Second pause point.
    try {
        yield 3; // Third pause point.
    } catch(e) {
        console.log(e);
    } finally {
        yield 4; // Fourth pause point. 
        // Call return at this point.
        // The generator immediately finishes.
        // The rest of code is ignored.
        yield 5; // Fifth pause point.
    }
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // {value: 4, done: false}
// Call return method when the current suspended position is Fourth pause point.
it.return("cleanup"); // {value: 'cleanup', done: true} - finishes the generator.
// The rest of the next method returns {value: undefined, done: true} 
it.next(); // {value: undefined, done: true} 
it.next(); // {value: undefined, done: true}

```

### 6.2 return keyword

> **Normal Usage**
> - terminate the generator immediately.

```js
function* gen(){
    yield 1;
    yield 2;
    return "done"; // close the generator.
    // the rest of the code is ignored.
    yield 3;
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 'done', done: true}
it.next(); // {value: undefined, done: true}

```
> **return keyword with try...finally**
> - when the return keyword is used inside try block, the generator first jumps to finally block.
> - All code inside finally is run first.
> - yield is executed step by step.
> - Only after the finally block finishes, the value next to the return keyword is returned on the very last next().
> - Then, the generator is closed.

```js
function* gen(){
    yield 1;
    try {
        yield 2;
        return "done";  // this value next to return keyword is returned on the very last next().
        // Before returning at this point, the generator will make sure the code inside the finally block is run first.
    } catch(e) {
        console.log(e);
    } finally {
        // code inside finally block is run.
        yield 3;
    }
    // the rest of code is ignored.
    yield 4;
}

const it = gen();
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // {value: 'done', done: true}

```

## 09: Generator as Object Property

```js
const obj1 = {
    gen: function*(){
        yield 1;
        yield 2;
        yield 3;
    }
}

const obj2 = {
    // short form.
    *gen(){
        yield 1;
        yield 2;
        yield 3;
    }
}

for (const v of obj2.gen()) {
    console.log(v);
}

// 1
// 2
// 3


```

## 08: Instance of Generator Function

> - Generator Function cannot be used as a constructor - cannot call with new keyword.

```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

const it = new gen(); // Uncaught TypeError: gen is not a constructor
```

> - `this` inside Generator Function - similar to regular function's `this`, depending on how the function is called.

```js
function* gen(){
    console.log(this);
}
const it1 = gen();
it1.next(); 
// Window

const obj = {
    *gen(){
        console.log(this);
    }
}
const it2 = obj.gen();
it2.next();
// {gen: ƒ} - who calls the function, who becomes this.
```

> - the GeneratorFunction object is the instance of Generator Function.

```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

gen.prototype.sayHello = function(){
    console.log("I am an instance method on gen prototype.")
}

const it = gen();


console.log(it instanceof gen); // true
// Since it is the instance of gen, it can access properties on the gen.prototype.
it.sayHello(); // I am an instance method on gen prototype. 
console.log(it.__proto__ === gen.prototype); // true
console.log(Object.getPrototypeOf(it) === gen.prototype); // true
```

> - unconventional usage but not really useful.

```js
function* gen(a, b) {
    this.a = a;
    this.b = b;
}

// Call generator with gen.prototype as `this`
// It is like adding properties on gen.prototype.
// gen.prototype.a = a;
// gen.prototype.b = b;
const it = gen.call(gen.prototype, 10, 20); 
it.next();
console.log(it.a); // 10
console.log(it.b); // 20

```
