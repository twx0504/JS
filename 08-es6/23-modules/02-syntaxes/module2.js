// 1. syntax
// export variableStatement
// export declaration

export let a = 1;
export let b = 2;
export function fn() {
  return 3;
}
export class Person {}

// special case
// export {}; // this is not export an object

// 2. export expression or value or variable solely is not allowed.
// - Think about how can import statement find this value?
// - There's no name / identifier to get to this value.
// export 10;
// let c = 100;
// export c; // variable
// export 1 + 1; // expression
// export var a = 10;
// export var b = 10;
// export var fn = function(){return 10};
// export {a:1}; // export an object

// 3. export annonymous function or class declaration is not allowed.
// - think about how can import statement refers to this function or class if it has no name?
// export function(){}
// export class{}
