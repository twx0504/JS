import { a } from "./import-a.js";
import { b } from "./import-b.js";

console.log(`Imported ${a} and ${b}`);

let c = `My favourite fruit is ${a} & ${b}`;

// Note: We can also export a & b that are imported before this in this module!
export { a, b, c };
