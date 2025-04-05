// Filter elements > 10

function filter(arr, fn) {
  var len = arr.length;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (fn(arr, i)) {
      result.push(arr[i]); // result[result.length] = arr[i]
    }
  }
  return result;
}

var arr = [1, 3, 5, 7, 9, 10, 12, 14, 19, 30];
var filteredArr = filter(arr, function(arr, index) {
    return arr[index] >= 10;
});

console.log(filteredArr); // [ 10, 12, 14, 19, 30 ]
