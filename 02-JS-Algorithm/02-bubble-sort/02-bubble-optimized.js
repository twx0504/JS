var arr = [22, 1, 5, 3, 2, 6, 77, 11, 3, 12, 50];
var len = arr.length;
var isSorted;
for (var i = 0; i < len - 1; i++) {
  isSorted = true; // Assume it is sorted by default.
  for (var j = 0; j < len - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      var temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      isSorted = false; // When you enter this logic, it is not sorted!
    }
  }
  if (isSorted) { // If it is already sorted, then we break out of the loop.
    break;
  }
}
console.log(arr);
