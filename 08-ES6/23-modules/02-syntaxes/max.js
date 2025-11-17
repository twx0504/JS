/* Each file has its own scope - kind of like function scope / block scope */
/* It is not global scope. */

import data from "./data.js";

const a = data.max;
const b = data.min;

function max() {
  return a > b ? a : b;
}

export default max;
