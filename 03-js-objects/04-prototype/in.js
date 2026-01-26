function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.nationality = "American";

var twx = new Person("twx", 25);

console.log("name" in twx); // true
console.log("nationality" in twx); // true
console.log("age" in twx); // true
console.log("toString" in twx); // true
console.log("gender" in twx); // false
