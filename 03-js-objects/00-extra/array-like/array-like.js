/* Convert arguments to arr */
// function sum(a, b, c) {
//   var arr = [];
//   for (var i = 0; i < arguments.length; i++) {
//     arr.push(arguments[i]);
//   }
//   console.log(arr);
// }

// sum(1, 2, 3, 4);

/* Use call! */
// function sum(a, b, c) {
//   var arr = Array.prototype.slice.call(arguments); // arguments.slice
//   console.log(arr);
// }

// slice(start, end)
// slice() start = 0 end = arr.length - 1
// slice(1) start = 1 end = arr.length - 1
// start = null / undefined -> null = 0 undefined = 0
// non-number primitive -> convert to number
// end: null -> end = 0  undefined -> end = arr.length - 1
// +ve / -ve

var arr = [1, 2, 3, 4];
Array.prototype._slice = function (start, end) {
  start = Number(start) !== Number(start) ? 0 : Number(start);
  end = end === undefined ? this.length : Number(end);
  if (start < 0) {
    start = Math.abs(start) >= this.length ? 0 : this.length + start;
  }
  if (end < 0) {
    end = Math.abs(end) >= this.length ? 0 : this.length + end;
  }
  console.log(start, end);
  var res = [];
  for (var i = start; i < end; i++) {
    res[res.length] = this[i];
  }

  return res;
};

console.log(arr._slice(-1));
console.log(arr.slice(-1));
