var arr = [1, 33, 43, 5, 76, 8, 9, 9, 9, 12, 15, 18, 30, 32, 45, 100, 1];

function quickSortSpliced(arr) {
  // No sorting if array is empty or only contains one element.
  if (arr.length === 0 || arr.length === 1) return arr;
  var lefts = [];
  var mids = [];
  var rights = [];
  // you can choose any item as an pivot.
  var midIndex = Math.floor((arr.length - 1) / 2);
  var pivot = arr.splice(midIndex, 1)[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      lefts.push(arr[i]);
    } else if (arr[i] > pivot) {
      rights.push(arr[i]);
    } else {
      // any items same value as pivot
      mids.push(arr[i]);
    }
  }

  return quickSortSpliced(lefts).concat(pivot, mids, quickSortSpliced(rights));
}

console.log(quickSortSpliced(arr));

function quickSortSlice(arr) {
  if (arr.length === 0 || arr.length === 1) return arr;
  var lefts = [];
  var mids = [];
  var rights = [];
  // you can choose any item as an pivot.
  var midIndex = Math.floor((arr.length - 1) / 2);
  var pivot = arr.slice(midIndex, midIndex + 1)[0]; // pivot

  for (var i = 0; i < arr.length; i++) {
    if (i === midIndex) continue; // As arr.slice does not delete item at midIndex, we need to skip it.
    if (arr[i] < pivot) {
      lefts.push(arr[i]);
    } else if (arr[i] > pivot) {
      rights.push(arr[i]);
    } else {
      // any items same value as pivot
      mids.push(arr[i]);
    }
  }

  return quickSortSlice(lefts).concat(pivot, mids, quickSortSlice(rights));
}

console.log(quickSortSlice(arr));

/**
 * Pick leftmost element as pivot.
 * Move all elements >= pivot to the right
 * Move all elements <= pivot to the left
 * Move pivot to i
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @returns
 */
function partition(arr, left, right) {
  var i = left;
  var j = right;
  pivot = arr[left]; // Choose first element as pivot.
  while (i < j) {
    // exit when i >= j
    while (i < j && arr[j] >= pivot) {
      // if arr[j] >= pivot we decrease j, moving the pointer to arr[j - 1]
      j--;
    }
    while (i < j && arr[i] <= pivot) {
      // if arr[i] <= pivot we increase i, moving the pointer to arr[i + 1]
      i++;
    }
    // Swap larger element to the right
    // Swap smaller element to the left
    swap(arr, i, j); // i & j refers to element >= pivot and element <= pivot
  }

  // i & j points to the same index, where pivot should be.
  // Swap pivot with arr[i]
  // The pivot is now at the middle of the array, partitioning lefts and rights.
  swap(arr, left, i);
  return i;
}

/**
 * get medium out of left, mid, right index from arr.
 *
 * cases:
 * l m r || l m r => return m
 * m l r || r l m => return l
 * m r l || l r m => return r
 * @param {Array} arr
 * @param {number} left
 * @param {number} mid
 * @param {number} right
 * @returns
 */
function getMedianOfThree(arr, left, mid, right) {
  var l = arr[left],
    m = arr[mid],
    r = arr[right];
  if ((m <= l && r >= l) || (r <= l && m >= l)) return left;
  if ((m <= r && l >= r) || (l <= r && m >= r)) return right;
  return mid;
}

/**
 * swap arr[i] & arr[j] in place.
 * @param {Array} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [2, 4, 1, 5, 7, 9, 8];

/**
 * Perform quick sort for arr in place.
 * @param {Array} arr
 * @param {number} left
 * @param {number} right
 * @returns
 */
function quickSortDP(arr, left, right) {
  // Note: var i = left || 0 or var j = right || arr.length - 1 can result in infinite loop.
  var i = left === undefined ? 0 : left;
  var j = right === undefined ? arr.length - 1 : right;
  if (i >= j) return;

  // #1 Find value at median and swap with leftmost element
  var m = Math.floor((i + j) / 2);
  var median = getMedianOfThree(arr, i, m, j);
  swap(arr, i, median);
  // #2 Get index of pivot
  var pivot = partition(arr, i, j); // Get pivot
  // #3 Sort left side of pivot
  quickSortDP(arr, i, pivot - 1);
  // #4 Sort right side of pivot
  quickSortDP(arr, pivot + 1, j);
}
quickSortDP(arr);
console.log(arr);


