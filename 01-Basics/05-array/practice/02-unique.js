var arr = [
  1,
  1,
  2,
  2,
  "true",
  "true",
  true,
  true,
  undefined,
  undefined,
  null,
  null,
  [],
  [],
  NaN,
  NaN,
  "NaN",
  {},
  {},
  function () {},
  function () {},
];

// O(n) time
// O(n) space - due to creation of another array (but its length < arr.length)
// Note: this cannot filter the reference data types.
function unique(arr) {
  if (!Array.isArray(arr)) return;
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) {
      res.push(arr[i]);
    }

    // Note: NaN cannot be de-duplicated!
    // if (res.indexOf(arr[i]) === -1) {
    //   res.push(arr[i]);
    // }
  }
  return res;
}

console.log(unique(arr));
console.log(unique("a"));

/* Write a version of unique method that uses nested loop and splice. */
