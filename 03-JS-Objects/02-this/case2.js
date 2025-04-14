var person = {
  name: "Too Wei Xin",
  sleep() {
    console.log(this);
  },
  say() {
    console.log("I am ", this.name);
  },
};

person.sleep(); // { name: 'Too Wei Xin', sleep: [Function: sleep] } this refers to person
person.say(); // I am  Too Wei Xin

// Caveat:
var sleep = person.sleep; // assign the reference of sleep function to sleep variable.
sleep(); // this refers to global. (it is similar to global.sleep()) it is global who calls sleep now, not object anymore.

/**
 * similar to this
 * var sleep = function() {}
 */

// Array

var arr = [
  1,
  2,
  3,
  function () {
    console.log(this);
  },
];

arr[3](); // this refers to arr.

// Caveat again!
var fn = arr[3];
fn(); // this refers to global.
