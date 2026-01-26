/* Understanding Fn Constructor */
// new Function(arg1, arg2, arg3, ..., fnBody) where each parameter accepts string.
var fn = new Function("a", "b", "c", "console.log(a+b+c)");
console.log(fn);

// Scenario: Dynamic Arguments Passing
function fn(cb) {
  // there's no parameter. We can pass any number of arguments.
  // Obtain arguments from arguments object.
  // console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
  // Q: How can we pass each item of arguments into fn() who takes three arguments?
  var len = arguments.length;
  var args = [];
  for (var i = 1; i < len; i++) {
    args.push(arguments[i]);
  }
  // We want this form: fn(argument[0], argument[1], argument[2])
  // But without ES6 rest parameters, it seems we can't deal with it.
  // fn(???); // how can we pass each arguments item into this to make it like fn(argument[0], argument[1], argument[2])
  // Solution: we need to use Function constructor!

  // Receive arguments based on the number of arguments passed.
  // args.length = 3 => sum(args[0], args[1], args[2])
  // args.length = 2 => sum(args[0], args[1])

  // Create a fn whose return value is like `return fn(argument[0], argument[1], argument[2])`
  // createFn returns a function, receiving a argsLen.
  var res = createFn(args.length)(args, cb); // return sum(args[0], args[1], args[2]) => something we want to construct.
  // var res1 = createFn(args.length)(args, sum); // return sum(args[0], args[1], args[2]) => something we want to construct.
  // var res2 = createFn(args.length)(args, add); // return sum(args[0], args[1], args[2]) => something we want to construct.
  return res;
}

console.log(fn(sum, 1, 2, 3));
console.log(fn(add, 1, 2));
console.log(fn(min, 1, 2));

/* Some example functions */
function sum() {
  var len = arguments.length;
  var sum = 0;
  for (var i = 0; i < len; i++) {
    sum += arguments[i];
  }
  return sum;
}

function add(a, b) {
  return a + b;
}

function min(a, b) {
  return a > b ? b : a;
}

// Example of fn we want to construct using Function constructor
// function anonymous(args) {
//   return sum(args[0], args[1], args[2]);
// }
// function anonymous(args) {
//   return min(args[0], args[1]);
// }
// function anonymous(args) {
//   return add(args[0], args[1]);
// }
// =====================================================================
// Problem: function name cannot be hardcoded. Passing it as an argument.
// new Function("args", "fnName", "return fnName(...)")
// function anonymous(args, fnName) {
//   return fnName(args[0], args[1]);
// }

function createFn(argsLength) {
  // fnName is a function, we need to pass it as an argument.
  var fnBody = "return fnName(";

  for (var i = 0; i < argsLength; i++) {
    if (i === argsLength - 1) {
      fnBody += "args[" + i + "])";
    } else {
      fnBody += "args[" + i + "],";
    }
  }
  return new Function("args", "fnName", fnBody); // fnName as one of the parameter.
}


console.log(createFn(1));
// ƒ anonymous(context,key,args
// ) {
// return sum(args[0],args[1],args[2])
// }


//https://www.icodingedu.com/course/113/task/6381/show (1:06:48)