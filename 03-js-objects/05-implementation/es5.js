// ES5 Method
Function.prototype._call = function (context) {
  // Throw error if the object who calls _call is not a function.
  // sum._call() ok.
  // obj._call() throw error when obj inherits from Function.prototype.
  if (typeof this !== "function") {
    throw new TypeError("XXX._call is not a function");
  }
  // Convert null / undefined to globalThis (browser: refers to window, nodejs: refers to global)
  if (context === null || context === undefined) context = globalThis;
  // Convert primitive to their corresponding wrapper object.
  if (typeof context !== "object") context = new Object(context);
  // 01: Creating a unique key to prevent naming conflict and overriding properties of context.
  do {
    var key = "fn_" + Math.floor(Math.random() * new Date().getTime());
  } while (context.hasOwnProperty(key));
  // 02: Making thisFn to be a method of context
  context[key] = this;
  // 03: Dealing with arguments
  var args = [];
  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    args.push(arguments[i]);
  }
  var res = _createFn(len - 1)(context, key, args);
  // 04: Storing the result.
  // We need to create a function like this.
  // args.length determine the number of args to be passed.
  //   (function fn(context, key, args) {
  //     return context[key](args[0], args[1], args[2]);
  //   })(context, key, args);

  // 05: Restoring context by removing property key.
  delete context[key];
  return res;
};

Function.prototype._apply = function (context, args) {
  if (args === undefined || args === null) args = [];
  if (typeof this !== "function") {
    throw new TypeError("Not callable.");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("args must be an array.");
  }
  if (context === undefined || context === null) context = globalThis;
  if (typeof context !== "object") context = new Object(context);

  var key = "fn_" + Math.floor(Math.random() * new Date().getTime());
  context[key] = this;
  var len = args.length;
  var res = _createFn(len)(context, key, args);
  delete context[key];
  return res;
};

Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Not callable.");
  }
  if (context === undefined || context === null) context = globalThis;
  if (typeof context !== "object") context = new Object(context);
  var fn = this;
  var args = Array.prototype.slice.call(arguments, 1);
  function boundingFn() {
    var restArgs = Array.prototype.slice.call(arguments);

    var finalArgs = args.concat(restArgs);
    if (this instanceof boundingFn) {
      return new fn(...finalArgs); // Think about how do you do this without ES6.
    } else {
      return fn.apply(context, finalArgs);
    }
  }
  return boundingFn;
};

/**
 * create a function with dynamic argument passing based on arguments length.
 * @param {Number} argsLength
 * @returns {Function} A function
 */
function _createFn(argsLength) {
  var argsList = [];
  for (var i = 0; i < argsLength; i++) {
    argsList.push("args[" + i + "]");
  }

  // argsList.length === 0: return fn();
  // argsList.length > 0: return fn(args[0],args[1], ...);
  var body = "return fn[key](" + argsList.join(",") + ");"; // Note: fn can be sum, context[key]
  return new Function("fn", "key", "args", body);
}
