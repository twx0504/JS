// Note: where you put the callback affects the behaviours.

function throttle(callback, duration = 20) {
  var timer = null;

  // return a throttled event handler.
  return function () {
    if (timer) return;
    var args = arguments;
    var context = args[0] instanceof Event ? args[0].target : this;
    timer = setTimeout(function () {
      // execute callback first.
      typeof callback === "function" && callback.apply(context, args); // apply second argument can receive array-like object.
      // unlock.
      timer = null;
    }, duration);
  };
}

function throttleLeading(callback, duration = 1000) {
  var timer = null;

  // return a throttled event handler.
  return function () {
    if (timer) return;
    var args = arguments;
    var context = args[0] instanceof Event ? args[0].target : this;
    // typeof callback === "function" && callback.apply(context, args);
    timer = setTimeout(function () {
      timer = null;
    }, duration);
    typeof callback === "function" && callback.apply(context, args);
  };
}

function throttleES6(callback, duration = 20) {
  let timer = null;
  // return a throttled event handler.

  return function (...args) {
    if (timer) return;
    // ensure the use of wrapper function for the throttledFn contains this as event target.
    var context = args[0] instanceof Event ? args[0].target : this;
    timer = setTimeout(() => {
      // execute callback first.
      typeof callback === "function" && callback.apply(context, [...args]);
      // unlock.
      timer = null;
    }, duration);
  };
}
