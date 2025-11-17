/* Each file has its own scope - kind of like function scope / block scope */
/* It is not global scope. */

import data from "./data.js";
const a = data.max;
const b = data.min;
function min() {
  return a > b ? b : a;
}
export default min;
