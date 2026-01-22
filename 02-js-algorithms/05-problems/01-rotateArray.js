/* 
    rotate an array for k steps.

    k = 4
    [ 1, 2 ,3 ,4 ] k = 0
    [ 4, 1, 2 ,3 ] k = 1
    [ 3, 4, 1, 2 ] k = 2
    [ 2, 3, 4, 1 ] k = 3
    [ 1, 2, 3, 4 ] k = 4
*/

var data = [];
for (var i = 0; i < 100 * 100000; i++) {
  data.push(i);
}

// O(N^2) time O(1) space
function rotateV1(nums, k) {
  if (!Array.isArray(nums)) return;
  var len = nums.length;
  k = Math.floor(Math.abs(k % len));
  for (var i = 0; i < k; i++) {
    nums.unshift(nums.pop()); // unshift contains a for loop.
  }
}

console.time("V1");
rotateV1(data, 4000);
console.timeEnd("V1");

// O(N) time O(N) space
function rotateV2(nums, k) {
  if (!Array.isArray(nums)) return;
  var len = nums.length;
  k = Math.floor(Math.abs(k % len));
  var nums1 = nums.slice(-k); // contains a for loop
  var nums2 = nums.slice(0, len - k); // contains a for loop
  return nums1.concat(nums2); // contains a for loop
}

console.time("V2");
rotateV2(data,4000);
console.timeEnd("V2");

// [ 1, 2 ,3 ,4 ] k = 0
// res = []
// last = 4
// res = [4]
// res =

// O(N) time
// O(N) space
function rotateV3(nums, k) {
  k = k % nums.length;
  var res = [];
  var i = 0;
  while (i < k) {
    res.push(nums.pop());
    i++;
  }
  res = res.reverse().concat(nums);

  return res;
}
var nums = [1, 2, 3, 4, 5, 6, 7];

console.time("V3");
rotateV3(data, 4000);
console.timeEnd("V3");

/**
 * k = 2
 * [1, 2, 3, 4, 5 ,6, 7] => [7, 6, 5, 4, 3, 2, 1] step 1: reverse
 * [7, 6, 1, 2, 3, 4, 5] => [6, 7, 5, 4, 3, 2, 1] step 2: reverse
 *                       => [6, 7, 1, 2, 3, 4, 5] step 3: reverse
 * @param {Array} nums
 * @param {Number} k steps
 * @returns void(0)
 *
 * O(N) time
 * O(1) space
 */
function rotate(nums, k = 0) {
  if (!Array.isArray(nums)) return;

  var len = nums.length;
  // steps - consider negative and floating point () -> ROUND TOWARDS 0.
  k = Math.floor(Math.abs(k % len));

  // Reverse the array
  _reverse(nums);
  // var left = 0;
  // var right = k - 1;
  _reverse(nums, 0, k - 1);
  // left = k;
  // right = len - 1;
  _reverse(nums, k, len - 1);
  // start and end element index

  function _reverse(arr, start, end) {
    var len = arr.length;
    // Check NaN, Infinity, -Infinity
    var i = Number.isFinite(start) ? start : 0;
    var j = Number.isFinite(end) ? end : len - 1;
    while (i < j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }
}

var arr = [1, 2, 3, 4, 5, 6, 7];
console.time("Final");
rotate(data, 4000);
console.timeEnd("Final");
