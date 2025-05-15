// function debounce(fn, delay = 200) {
//   var timer = null;
//   return function () {
//     if (timer) {
//       // actually we can just clearTimeout without checking timer exists.
//       clearTimeout(timer);
//     }
//     var that = this;
//     var args = [];
//     var len = arguments.length;
//     for (var i = 0; i < len; i++) {
//       args.push(arguments[i]);
//     }
//     timer = setTimeout(function () {
//       fn.apply(that, args);
//       timer = null;
//     }, delay);
//   };
// }

/**
 * debounce function implemented with ES6
 * @param {function} fn callback to be called when the delay is reached.
 * @param {number} delay the time to wait
 * @returns 
 */
function debounceES6(fn, delay = 200) {
  var timer = null;
  return function (...args) {
    if (timer) {
      // actually we can just clearTimeout without checking timer exists.
      clearTimeout(timer);
    }
    timer = setTimeout(() => { // arrow function this inherits from its outer scope
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
