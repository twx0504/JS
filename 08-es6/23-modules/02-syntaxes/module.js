// #1: One module can only has one export default.
let username = "twx0504";
// let usernames = {}; // Be careful if export a reference data type.

// #2: export default value
// - default here is a keyword.
// - it is the same as:
// - export {username as default}; // note: default here is an alias.

// #3: export default supports 
// - expression, js value (plain value, object, array, etc), variable
// - function declaration
// - class declaration
// - do not support variable statement (var, const, let)
export default username;
// export default usernames;
// export default "Hello";
// export default 1 + 1;

// export default function () { // Annonymous Function
//   return "twx0504";
// }

// const obj = {}
// export default obj;


// export default function fn(){} // Named Function

// export default class A {} // Named Class
// export default class  {} // Annonymous Class

// #4: export default does not support declaration statement
// export default let c = 100;


