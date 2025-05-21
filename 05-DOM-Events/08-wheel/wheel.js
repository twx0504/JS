// 1. check if the browser support <wheel> event.
// 2. If wheel is not supported, check if <mousewheel> is supported.
// 3. If mousewheel is not supported, check if <DOMMouseScroll> is supported.
// How do we check if browser supports?
// 1. check if an element has this property
// 2. in operator e.g., "xxx" in obj
// 3. obj.prop !== undefined
// Graceful degradation: modern -> old

window._addWheelListener = function addWheelListener(
  el,
  handlerFn,
  options = { capture: false }
) {
  var support =
    "onwheel" in document
      ? "wheel" // Modern browsers
      : document.onmousewheel !== undefined
      ? "mousewheel" // Webkit and Edge
      : "DOMMouseScroll"; // Firefox
  console.log("support: ", support);
  el.addEventListener(support, _handleCompatibility, options);
  // handle compatibility
  function _handleCompatibility(e) {
    // Problem:
    // 1. Legacy events have different way to determine the direction of mousewheel movement.
    // 2. The implementation of e.deltaY / e.wheelDelta / e.detail is inconsistent.
    // Solution:
    // standardize by adding e.deltaY even if the event object doesn't have it.
    // make sure e.deltaY is at least 100 - 120+
    e.wheelDelta && (e.deltaY = e.wheelDelta * -1);
    e.detail && (e.deltaY = e.detail * 40);
    handlerFn.apply(this, arguments);
  }
};

// Testing:
// var support =
//   document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";

// Different Ways of Handling Compatibility
// var support =
//   "onwheel" in document.createElement("div")
//     ? "wheel"
//     : document.onmousewheel !== undefined
//     ? "mousewheel"
//     : "DOMMouseScroll";

// 1. If some values inside a function is constantly changing based on different use case, make it parameters (data type other than function type).
// 2. If a portion of a function is constantly changing, e.g., conditional checking, make it a param that receives a callback.
// e.g., filter sort throttle debounce wheel event handler etc.
// refactor common code into common utilty function.
