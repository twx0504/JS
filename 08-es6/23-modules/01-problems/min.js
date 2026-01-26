// This causes naming conflict.
// const a = data.max;
// const b = data.min;
// function min() {
//   return a > b ? b : a;
// }

// Modify the names and the code is fine again.
const m = data.max;
const n = data.min;
function min() {
  return m > n ? n : m;
}

