let a = 1;
let b = 2;
function bar() {
  return "bar";
}

// Alias
// - import must use alias if alias is used
export { a as x, b as y, bar };
