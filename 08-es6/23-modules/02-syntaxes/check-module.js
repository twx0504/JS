// this at the top level of module is undefined.
// We can use this property to check if this script is loaded as module or not.
if (typeof this !== "undefined") {
  throw new Error("Use module to load this script");
}

console.log("check-module.js loaded");
