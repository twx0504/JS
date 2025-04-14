var arr = [1, 2, 3];

console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

function Person(name) {
  this.name = name;
}

var twx = new Person("twx");
console.log(twx instanceof Person); // true
console.log(twx instanceof Array); // false
console.log(twx instanceof Object); // true
