Function.prototype._call = function (context) {
  if (typeof this !== "function") {
    throw TypeError("._call is not a function.");
  }
  if (context === undefined || context === null) context = globalThis;
  if (typeof context !== "object") context = new Object(context);

  var key = "fn_" + Math.floor(Math.random() * new Date().getTime());
  context[key] = this;

  var args = [];
  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    args.push(arguments[i]);
  }
  var res = _createFn(len - 1)(context, key, args);
  delete context[key];
  console.log(res);
  return res;
};

function _createFn(argsLen) {
  var fnBody = "return context[key](";
  for (var i = 0; i < argsLen; i++) {
    if (i === argsLen - 1) {
      fnBody += "args[" + i + "]);";
    } else {
      fnBody += "args[" + i + "],";
    }
  }

  return new Function("context", "key", "args", fnBody);
}

function sum(a, b, c) {
  return a + b + c;
}

var obj = {};
sum._call(obj, 1, 2, 3);
sum.call(obj, 1, 2, 3);
console.log(_createFn(3));
