# Let & Const

> - declare a variable.
> - scope to block / function.
> - do not become property of the window object.
> - do not redeclare existing variable with let or const.

> tip: declare before use due to Temporal Dead Zone (TDZ).
> Note: Temporal refers to when a variable is accessed during execution, not where it appears in the code!
>  Access before initialization -> ReferenceError
>  Access after initialization -> Fine, even if the code was written earlier in the block.

```js
// Fn define here.
const fn = () => console.log(a); 
let a = 3; // TDZ ends.
fn(); // Now safe. Execute fn after a is initialized. (No ReferenceError)
```

```js
if (true) {
    /* temporal dead zone start */
    // tmp = "abc"; // Uncaught ReferenceError: Cannot access 'tmp' before initialization
    // console.log(tmp);
    let tmp; /* temporal dead zone end */
    console.log(tmp); // undefined
}
```

## Let

> - reassignable.

## Const

> - not reassignable.
> - it must be initialized at the time of declaration. 
> - creates immutable reference to a value (primitive / reference).
> - reference data type is still mutable (content can change), only its reference is immutable.

## Block Scope

> - form block scope when you use let within block.
> - e.g., loop, conditionals (if, switch)
> - special case: function & object syntax doesn't count as block scope.
> - block scope can be nesting.

**ES6**
```js
let age = 10; // this is still in global scope

// forming block scope
{
  let age = 25;
  console.log(age);
}

```
**ES5 (Transpiled by Babel)**

```js
var age = 10; // this is still in global scope

// forming block scope
{
  var _age = 25;
  console.log(_age);
}
```


> - each iteration of loop create a new block scope.

```js
for (let i = 0; i < 5; i++) {
  // note: header has distinct scope.

  // let i = 10; // this will not throw error, indicating the body of the loop creates its own scope.
  // each iteration, create 5 block scope.
  setTimeout(function () {
    console.log(i);
  }, 100);
}

// equivalent to
// {
//   // Simulating header scope
//   let i = 0;
//   {
//     // Simulating body scope
//     setTimeout(function () {
//       console.log(i); // Accesses outer scope's i
//     }, 100);
//   }
// }
// {
//   // Simulating header scope
//   let i = 1;
//   {
//     // Simulating body scope
//     setTimeout(function () {
//       console.log(i); // Accesses outer scope's i
//     }, 100);
//   }
// }
// {
//   // Simulating header scope
//   let i = 2;
//   {
//     // Simulating body scope
//     setTimeout(function () {
//       console.log(i); // Accesses outer scope's i
//     }, 100);
//   }
// }
// {
//   // Simulating header scope
//   let i = 3;
//   {
//     // Simulating body scope
//     setTimeout(function () {
//       console.log(i); // Accesses outer scope's i
//     }, 100);
//   }
// }
// {
//   // Simulating header scope
//   let i = 4;
//   {
//     // Simulating body scope
//     setTimeout(function () {
//       console.log(i); // Accesses outer scope's i
//     }, 100);
//   }
// }

// babel transpiled ES5:
// var _loop = function _loop(i) {
//   setTimeout(function () {
//     console.log(i);
//   }, 100);
// };
// for (var i = 0; i < 5; i++) {
//   _loop(i); // use of closure.
// }
```