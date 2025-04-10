// find the index of item with the value 15.
// assume the array is sorted.
var arr = [1, 3, 4, 5, 7, 8, 9, 12, 15, 18, 30, 32, 45];
var data = [];
for (var i = 0; i < 1000 * 1000; i++) {
  data.push(i + 1);
}
function bruteForceSearch(nums, target) {
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
}
// console.time("bruteForce");
// console.log(bruteForceSearch(arr, 15));
// console.timeEnd("bruteForce");

function binarySearch(nums, target) {
  var i = 0;
  var j = nums.length - 1;
  while (i <= j) {
    var m = Math.floor((i + j) / 2);

    if (nums[m] > target) {
      j = m - 1;
    } else if (nums[m] < target) {
      i = m + 1;
    } else {
      return m;
    }
  }
  return -1;
}
// console.time("binary");
// console.log(binarySearch(arr, 15));
// console.timeEnd("binary");

function binarySearchRecursion(nums, target, i, j) {
  i = i || 0;
  j = j || nums.length - 1;
  if (i > j) return -1; // when searching everything, it is still nothing, [m+1, m-1] so i > j
  var m = Math.floor((i + j) / 2);
  if (nums[m] > target) {
    return binarySearchRecursion(nums, target, i, m - 1);
  } else if (nums[m] < target) {
    return binarySearchRecursion(nums, target, m + 1, j);
  } else {
    return m;
  }
}
// console.time("binaryRecursion");
// console.log(binarySearchRecursion(arr, 15));
// console.timeEnd("binaryRecursion");
// console.time("binaryRecursion");
// console.log(binarySearchRecursion(arr, 150));
// console.timeEnd("binaryRecursion");

console.time("bruteForce");
for (var i = 0; i < 1000 * 1000; i++) {
  bruteForceSearch(data, 54231);
}
console.timeEnd("bruteForce");

console.time("binary");
for (var i = 0; i < 1000 * 1000; i++) {
  binarySearch(data, 54231);
}
console.timeEnd("binary");
console.time("binaryRecursion");
for (var i = 0; i < 1000 * 1000; i++) {
  binarySearchRecursion(data, 54231);
}
console.timeEnd("binaryRecursion");
