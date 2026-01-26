// function getMax(arr) {
//   var len = arr.length;
//   var max = arr[0];
//   for (var i = 1; i < len; i++) {
//     // max - arr[i] < 0
//     if (arr[i] > max) {
//       max = arr[i];
//     }
//   }
//   return max;
// }

// var arr = [1, 2, 3, 5, 10, 20, 5];
// var max = getMax(arr);
// console.log(max);

// function getMin(arr) {
//   var len = arr.length;
//   var min = arr[0];
//   for (var i = 1; i < len; i++) {
//     // arr[i] - min < 0
//     if (arr[i] < min) {
//       min = arr[i];
//     }
//   }
//   return min;
// }
//
// var arr = [20, 3, 5, 1, 4, 2, 9, 20];
// var min = getMin(arr);
// console.log(min);

function getMinOrMax(arr, fn) {
  var len = arr.length;
  var val = arr[0];
  for (var i = 1; i < len; i++) {
    if (fn(arr[i], val)) {
      val = arr[i];
    }
  }
  return val;
}

var arr = [20, 3, 5, 1, 4, 2, 9, 20];
var min = getMinOrMax(arr, function (a, b) {
  return a < b;
});
var max = getMinOrMax(arr, function (a, b) {
  return a > b;
});
console.log(min, max); // 1 20

function getMinOrMaxV2(arr, fn) {
  var len = arr.length;
  var val = arr[0];
  for (var i = 1; i < len; i++) {
    // a > b
    // b - a < 0
    // a < b
    // a - b < 0
    if (fn(val, arr[i]) < 0) {
      val = arr[i];
    }
  }
  return val;
}

var arr = [20, 3, 5, 1, 4, 2, 9, 20];
var min = getMinOrMaxV2(arr, function (a, b) {
  return b - a; // min
});
var max = getMinOrMaxV2(arr, function (a, b) {
  return a - b; // max
});

console.log(min, max); // 1 20
