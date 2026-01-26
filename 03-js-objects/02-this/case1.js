function fn() {
  //   "use strict";
  console.log(this);
}

// when the fn is in non-strict mode, it is similar to global.fn() this points to global.
// when the fn is in strict mode, this refers to undefined.
fn();

(function () {
  // "use strict";
  console.log(this);
})();
