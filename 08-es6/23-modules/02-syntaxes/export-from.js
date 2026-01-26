// import { a } from "./import-a.js";
// import { b } from "./import-b.js";
// export { a, b };

// import & export
// - a, b, c is accessible in this module.
// import { a, b, c } from "./import-c.js";
// export { a, b, c };
// console.log(a, b, c); // apple orange My favourite fruit is apple & orange

// re-exporting with export...from syntax
// - a, b, c is not accessible in this module.
export { a as apple, b as orange, c } from "./import-c.js";
// console.log(a, b, c); // export-from.js:8 Uncaught ReferenceError: a is not defined


