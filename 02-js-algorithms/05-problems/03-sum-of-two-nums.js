// find all posibilities of the sum of two number equals to target sum = 20
// Asume the array is sorted in ascending order.
// [1, 3, 5, 7, 10, 13, 15, 20, 22, 25]
// example: [5, 15], [7, 13]

var data = [];
for (var i = 0; i < 100 * 1000; i++) {
  data.push(i + 1);
}

/**
 * Brute Force Approach with Optimization.
 * O(N) -> O(N^2) worst time
 * O(N) space
 * @param {Array} arr
 * @param {Number} target
 * @returns an array of objects {a: x, b: y}
 */
function sumOfTwoNums(arr, target) {
  var len = arr.length;
  var res = [];
  var startBorder = 0;
  var maxLen = len;
  for (var i = startBorder; i < len; i++) {
    for (var j = i + 1; j < maxLen; j++) {
      var sum = arr[i] + arr[j];
      if (sum === target) {
        res.push({ a: arr[i], b: arr[j] });
        maxLen = j;
        break; // Moving forwards, the value is > target.
      }
    }
  }
  return res;
}

var arr = [1, 3, 5, 7, 10, 13, 15, 19, 20, 22, 25];
console.time("Test");
console.log(sumOfTwoNums(data, 100000));
console.timeEnd("Test");

/**
 * Double Pointer Version
 * O(N) time
 * O(N) space
 * @param {Array} arr
 * @param {Number} target
 * @returns an array of objects {a: x, b: y}
 */
function sumOfTwoNumsV2(arr, target) {
  var len = arr.length;
  var i = 0;
  var j = len - 1;
  var res = [];
  while (i < j) {
    var sum = arr[i] + arr[j];
    if (sum > target) {
      j--;
    } else if (sum < target) {
      i++;
    } else {
      res.push({
        a: arr[i],
        b: arr[j],
      });
      i++;
      j--;
    }
  }
  return res;
}

var arr = [1, 3, 5, 7, 10, 13, 15, 19, 20, 22, 25];
console.time("Test");
console.log(sumOfTwoNumsV2(data, 100000));
console.timeEnd("Test");
