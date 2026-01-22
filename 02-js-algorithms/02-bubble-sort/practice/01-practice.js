// V1
// [1, 5, 4, 2, 3]
// [1, 4, 2, 3, 5]
// [1, 2, 3, 4, 5]

// max turn: 4
// exchange count: 4 -> 3 -> 2 -> 1

function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

var arr = [1, 5, 4, 2, 3];
console.time("V1");
bubbleSort(arr);
console.timeEnd("V1");
console.log(arr);

// V2

function bubbleSortV2(arr) {
  var len = arr.length;
  var isSorted;
  var count = 0;
  for (var i = 0; i < len - 1; i++) {
    isSorted = true; // reset isSorted on every outer loop iteration.
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        isSorted = false;
      }
    }
    if (isSorted) {
      break;
    }
  }
}
var arr2 = [1, 5, 4, 2, 3, 7, 8, 9];
console.time("V2");
bubbleSortV2(arr2);
console.timeEnd("V2");
console.log(arr2);

// V3

function bubbleSortV3(arr) {
  var len = arr.length;
  var isSorted;
  var index;
  var sortedBorder = len - 1;

  for (var i = 0; i < len - 1; i++) {
    isSorted = true; // reset isSorted on every outer loop iteration.
    for (var j = 0; j < sortedBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        isSorted = false;
        index = j;
      }
    }
    if (!isSorted) {
      sortedBorder = index;
    }
    if (isSorted) {
      break;
    }
  }
}

var arr3 = [1, 5, 4, 2, 3, 7, 8, 9];
console.time("V3");
bubbleSortV3(arr3);
console.timeEnd("V3");
console.log(arr3);
