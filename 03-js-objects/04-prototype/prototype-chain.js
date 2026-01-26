function Person(name) {
  this.name = name;
  this.nationality = "Malaysia"; /* Comment out this to see */
}

// Define common properties / methods on Person.prototype
Person.prototype.sayHello = function () {
  console.log("Hello I am", this.name);
};

Person.prototype.nationality = "No mentioned";

var ljy = new Person("ljy");

// Prototype chain lookup happens when nationality is not existed.
console.log(ljy.nationality); // Malaysia

console.log(ljy.__proto__.__proto__.__proto__);
