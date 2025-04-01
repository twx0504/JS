var arr = [22, 1, 5, 3, 2, 6, 77, 11, 3, 12, 50];
var len = arr.length;
// the current status of the array
var isSorted;
// the start index of the sorted area
var sortedBorder = len - 1; // Initialize with len - 1 (the comparison count of the first turn)
// the index of element during exchange. At the end of each inner loop, it will be the index of element during the last exchange.
var index = 0;
for (var i = 0; i < len - 1; i++) {
  isSorted = true;
  for (var j = 0; j < sortedBorder; j++) {
    if (arr[j] > arr[j + 1]) {
      var temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      isSorted = false; // Set the current status of the array to not sorted.
      index = j; // Record the index of the element during exchange.
    }
  }

  if (!isSorted) {
    // Note: only set the sortedBorder when the inner for loop is finished and it enters the comparison logic.
    sortedBorder = index; // change the sorted border to index (the index of element during last exchange. )
  }
  if (isSorted) {
    break; // break if the status is sorted.
  }
}
console.log(arr);
