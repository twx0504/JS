// var obj1 = {
//   a: 1,
//   b: 2,
//   sum: function () {
//     return this.a + this.b;
//   },
// };
// var obj2 = {
//   a: 3,
//   b: 4,
//   sum: obj1.sum,
// };

// console.log(obj2.sum()); // 3 + 4 = 7

// function add() {
//   var a = 1,
//     b = 2;
//   return {
//     a: 10,
//     b: 20,
//     sum: function () {
//       return this.a + this.b;
//     },
//   };
// }
// console.log(add().sum()); // 10 + 20 = 30 (add() returns an object)

// var a = 1;
// var b = 2;
// function add() {
//   return this.a + this.b;
// }
// var obj = {
//   a: 10,
//   b: add(),
//   sum: add,
// };
// var result = obj.sum(); // NaN 10 + fn
// console.log(result); // NaN

var a = 1;
var obj = {
  a: 2,
  add: (function () {
    var a = this.a; // 1 in browser, undefined in Nodejs
    return function () {
      console.log(a + this.a); // window.a + this.a
    };
  })(),
};
obj.add(); // 1 + 2 = 3 (browser) NaN in Nodejs

console.log(this); // window in browser , {} in nodejs
