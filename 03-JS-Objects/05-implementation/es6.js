// call(this, arg1, arg2, ...) ~> context.fn()

// ES6 Method
Function.prototype._call = function (context, ...args) {
  // Throw error if the object calling _call is not a function.
  // E.g., var obj = Object.create(Function.prototype) where this obj can call "_call"
  if (typeof this !== "function") {
    throw new TypeError(
      "The object calling Function.prototype._call is not of type function."
    );
  }
  // Turn null / undefined to globalThis (browser: refers to window)
  if (context === null || context === undefined) context = globalThis;
  // Turn primitive to their corresponding wrapper object.
  if (typeof context !== "object") context = new Object(context);
  // 01: Creating a unique key to prevent naming conflict and overriding properties of context.
  var key = Symbol();
  // 02: Making thisFn to be a method of context
  context[key] = this;
  // 03: Dealing with arguments
  // 04: Storing the result.
  var res = context[key](...args); // how to pass args
  // 05: Restoring context by removing property key.
  delete context[key];
  return res;
};

Function.prototype._apply = function (context, args) {
  if (args === undefined || args === null) args = [];
  if (typeof this !== "function") {
    throw new TypeError("._apply is not a function");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("args must be an array.");
  }
  if (context === undefined || context === null) context = globalThis;
  if (typeof context !== "object") context = new Object(context);

  var key = Symbol();
  context[key] = this;
  var res = context[key](...args);
  delete context[key];
  return res;
};

Function.prototype._bind = function (context, ...args1) {
  var fn = this; // any fn calling _bind
  return function (...args2) {
    fn._call(context, ...args1, ...args2);
  };
};

var obj = { a: 1, b: 2, c: 3 };
function sum(a, b, c) {
  return a + b + c;
}

// when fn.call() it is fn who calls the call function.
// naturally this inside call refers to this fn.
// obj is the context we pass into.
// we want this obj to call the fn internally.
// inside
// obj[a random key] = this;
// when we invokes obj[a random key]() it is like obj.this() = obj.fn()
// so this val inside fn will be obj
// sum._call(obj, 6, 6, 6);
console.log(sum._call(obj, 6, 6, 6));
console.log(sum.call(obj, 6, 6, 6));

console.log(sum._apply(obj, [6, 6, 6]));
console.log(sum.apply(obj, [6, 6, 6]));

console.log(sum.apply(obj));
console.log(sum._apply(obj));

console.log(sum.apply(obj, undefined));
console.log(sum._apply(obj, undefined));

console.log(sum.apply(obj, null));
console.log(sum._apply(obj, null));
// console.log(sum.apply(obj, 1));
// ...args:  6 6 6
// 1 2 3

// var newObj = Object.create(Function.prototype);

// newObj._call();
