// export { a, b, c, fn, Person }; // working

let a = 1;
let b = 2;
let c = 3;
function fn() {
  return "fn";
}
class Person {}
export { a, b, c, fn, Person };



// A module can have both named export and default export.
// - named export can have many.
// - default export can only have one.
export default function () {
  return "I am default.";
}

// - This line declare these identifiers will be exported (create live bindings).
// - This line doesn't read or execute their values
// - Temporal Dead Zone of let / const is not triggered 