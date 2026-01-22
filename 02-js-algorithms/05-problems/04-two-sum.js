/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function (nums, target) {
//   var len = nums.length;
//   for (var i = 0; i < len; i++) {
//     for (var j = i + 1; j < len; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
// };

// [3, 4, 2]
//

// var twoSum = function (nums, target) {
//   var len = nums.length;
//   var i = 0;
//   var j = len - 1;
//   while (i < j) {
//     if (nums[i] + nums[j] === target) {
//       return [i, j];
//     }
//     if (j === i + 1) {
//       j = len - 1;
//       i++;
//     } else {
//       j--;
//     }
//   }
// };

// var arr = [2, 7, 11, 15];

// console.log(twoSum(arr, 9));

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  if (nums.length < 2) return [];
  var mapNumToIndex = {}; // store a collection of number:index pairs
  var len = nums.length;
  for (var i = 0; i < len; i++) {
    var numToSearch = target - nums[i]; // numToSearch is what we are looking for.
    if (mapNumToIndex[numToSearch] !== undefined) {
      // If accessing property is successful, it is not undefined.
      return [mapNumToIndex[numToSearch], i]; // return the previous index and current index that satisfy the condition.
    }
    mapNumToIndex[nums[i]] = i; // store the number and index of the current turn to map.
  }
};
var arr = [2, 7, 11, 15];

console.log(twoSum(arr, 9));
