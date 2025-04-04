// return elements of an array that is more than n.
// function filter(arr, n) {
//   var filtered = [];
//   var len = arr.length;
//   for (var i = 0; i < len; i++) {
//     if (arr[i] > n) {
//       filtered[filtered.length] = arr[i];
//     }
//   }
//   return filtered;
// }
// var arr = [1, 2, 3, 4, 5, 6, 7];
// var filtered = filter(arr, 3);
// console.log(filtered);

function filter(arr, fn) {
  var filtered = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    // arr[i] > n
    // arr[i] < n
    // callback fn
    if (fn(arr[i])) {
      // Note: if filtered[i] = arr[i], there could introduce some empty slots if some indices are skipped.
      filtered[filtered.length] = arr[i];
    }
  }
  return filtered;
}

var arr = [1, 2, 3, 4, 5, 6, 7];
var filtered = filter(arr, function (a) {
  return a > 3;
});

var filtered2 = filter(arr, function (a) {
  return a < 5;
});

var filteredEven = filter(arr, function (a) {
  return a % 2 === 0;
});

console.log(filtered, filtered2, filteredEven);
