// a & b variable name may cause conflict with another js file.
const a = data.max;
const b = data.min;

function max() {
  return a > b ? a : b;
}
