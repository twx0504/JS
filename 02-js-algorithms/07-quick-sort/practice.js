/* Test */

function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
var data = [];
for (var i = 0; i < 1000; i++) {
  data.push(getRandom(1, 10000));
}

// We search right to left when we pick leftmost element as pivot.
// In the case when you search left to right
// until i === j where nums[i] === nums[j] > nums[left]
// So when we break out of the loop,
// swapping the leftmost (smaller value) and the last item (bigger value).
// Fail the partitioning (Doing from right to left will not have this problem)

function partition(arr, left, right) {
  var pivot = arr[left];
  var i = left;
  var j = right;
  while (i < j) {
    // find the first element < pivot (when it break out of this inner loop).
    while (i < j && arr[j] >= pivot) {
      j--; // decrease j when the arr[j] >= pivot
    }
    // find the first element > pivot (when it break out of this inner loop).
    while (i < j && arr[i] <= pivot) {
      i++; // increase i when the arr[i] <= pivot
    }

    // for arr[i] & arr[j] such that i < j we need to swap the place.
    // Ensure element >= pivot is always to the right of the pivot and vice versa.
    // There's case when i === j that is no need to swap.
    if (i < j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  // Swap the pivot and the leftmost element when i === j refers to the position of pivot.
  var temp = arr[i];
  arr[i] = arr[left];
  arr[left] = temp;
  return i;
}

function getMedianOfThree(arr, left, mid, right) {
  var l = arr[left];
  var m = arr[mid];
  var r = arr[right];

  if ((m <= l && r >= l) || (r <= l && m >= l)) return left;
  if ((m <= r && l >= r) || (l <= r && m >= r)) return right;
  return mid;
}

function quickSort(arr, left, right) {
  // Termination Condition
  if (left >= right) return;
  var i = left === undefined ? 0 : left;
  var j = right === undefined ? arr.length - 1 : right;
  var m = Math.floor((i + j) / 2);
  var med = getMedianOfThree(arr, i, m, j);

  var temp = arr[med];
  arr[med] = arr[i];
  arr[i] = temp;

  var p = partition(arr, i, j);
  quickSort(arr, i, p - 1);
  quickSort(arr, p + 1, j);
}

var arr = [6, 2, 1, 5, 4, 7, 3, 10];
console.time("quickSort");
quickSort(data);
console.timeEnd("quickSort");

console.log(data);
