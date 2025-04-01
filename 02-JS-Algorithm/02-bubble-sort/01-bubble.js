var arr = [22, 1, 5, 3, 2, 6, 77, 11, 3, 12, 50];

var len = arr.length;
for (var i = 0; i < len - 1; i++) {
  for (var j = 0; j < len - i - 1; j++) {
    // When left element > right element, swapping happens.
    if (arr[j] > arr[j + 1]) {
      // Swapping logic.
      var temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;

      // XOR Swapping logic.
      // arr[j] = arr[j] ^ arr[j + 1];
      // arr[j + 1] = arr[j] ^ arr[j + 1];
      // arr[j] = arr[j] ^ arr[j + 1];
    }
  }
}

console.log(arr);
