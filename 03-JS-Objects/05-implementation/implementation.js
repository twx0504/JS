/**
 * Custom implementation of _call method, mimicking the behavior of Function.prototype.call.
 *
 * @param {Object} context - The context object to bind to `this`.
 * @param {...*} args - Arguments passed to the function.
 * @returns {*} The return value of the function.
 * @throws {TypeError} If `this` is not a function.
 */
Function.prototype._call = function (ctx) {
  if (typeof this !== "function") {
    throw new TypeError("Not Callable");
  }
  ctx = _validateContext(ctx);
  var key = "fn_" + Math.floor(Math.random() * Date.now());
  // Note: when you call fn._call({}, ...args), there's chance you will see the key on the {}
  // akin to ctx[key] = this
  Object.defineProperty(ctx, key, {
    value: this,
    enumerable: false,
  });
  var args = [];
  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    args.push(arguments[i]);
  }
  var res = _createFn(len - 1)(ctx, key, args);
  console.log(_createFn(len - 1));
  delete ctx[key];
  return res;
};

/**
 * Custom implementation of _apply method, mimicking the behavior of Function.prototype.apply.
 *
 * @param {Object} context - The context object to bind to `this`.
 * @param {Array} args - The array of arguments to pass to the function.
 * @returns {*} The return value of the function.
 * @throws {TypeError} If `this` is not a function.
 */
Function.prototype._apply = function (ctx, args) {
  if (typeof this !== "function") {
    throw new TypeError("Not Callable");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("args must be an array.");
  }
  ctx = _validateContext(ctx);
  var key = "fn_" + Math.floor(Math.random() * Date.now());
  // akin to ctx[key] = this
  Object.defineProperty(ctx, key, {
    value: this,
    enumerable: false,
  });
  var len = args.length;
  var res = _createFn(len)(ctx, key, args);
  delete ctx[key];
  return res;
};

/**
 * Custom implementation of _bind method, mimicking the behavior of Function.prototype.bind.
 *
 * @param {Object} context - The context object to bind to `this`.
 * @param {...*} args - The arguments to pre-set when the function is called.
 * @returns {Function} The bound function.
 * @throws {TypeError} If `this` is not a function.
 */
Function.prototype._bind = function (ctx) {
  if (typeof this !== "function") {
    throw new TypeError("Not Callable");
  }
  ctx = _validateContext(ctx);
  var fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  function _boundingFn() {
    var restArgs = [];
    for (var i = 0; i < arguments.length; i++) {
      restArgs.push(arguments[i]);
    }
    var finalArgs = args.concat(restArgs);
    // Alternative if (new.target) {}
    if (this instanceof _boundingFn) {
      var instance = Object.create(fn.prototype); // instance points to fn.prototype where fn is the constructor.
      var res = fn._apply(instance, finalArgs);
      // Note: the point of this check is to ensure if there's a user-defined return value that is an object.
      // return if there is one.
      // otherwise, return instance.
      return typeof res === "object" && res !== null ? res : instance;
    } else {
      return fn._apply(ctx, finalArgs);
    }
  }
  // Note: _boundingFn prototype is not fn.prototype where fn is the fn / constructor.
  // - however, when new _boundingFn we get a instance whose __proto__ points to Constructor.prototype.
  // - the point of this line is to correct the prototype of _boundingFn so that it points to Constructor.prototype.
  // - whether this code is necessary, it is up to you.
  // _boundingFn.prototype = fn.prototype;

  return _boundingFn;
};

/**
 * Creates a dynamic function that can execute based on the number of arguments passed.
 *
 * @param {number} argsLength - The number of arguments the function will take.
 * @returns {Function} A dynamically created function.
 */
function _createFn(argsLength) {
  var argsList = [];
  for (var i = 0; i < argsLength; i++) {
    argsList.push("args[" + i + "]");
  }

  // argsList.length === 0: return fn();
  // argsList.length > 0: return fn(args[0],args[1], ...);
  var body = "return fn[key](" + argsList.join(",") + ");";
  // note: separate fn & key.
  // - passing fn[key] as fn causes the loss of this binding.
  // - var fn = context[key] means extracting method and storing in a variable.
  return new Function("fn", "key", "args", body);
}

/**
 * Validates and returns the appropriate context object, converting primitives to objects if needed.
 *
 * @param {*} context - The context object to validate.
 * @returns {Object} The validated context object.
 */
function _validateContext(ctx) {
  if (ctx === undefined || ctx === null) return globalThis;
  if (typeof ctx !== "object") return new Object(ctx);
  return ctx;
}

// function sum(a, b, c) {
//   console.log(a, b, c);
//   console.log("this", this);
// }

// sum._call({ a: 1 }, 1, 2, 3);


