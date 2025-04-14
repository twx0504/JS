function Person(name) {
  this.name = name;
}

var twx = new Person("twx");
// console.log(Object.getPrototypeOf(twx));

// var fn = new Function();
// console.log(fn.prototype);

// Putting common methods on Person.prototype.
Person.prototype.sayHello = function () {
  console.log("Hello I am", this.name);
};

Person.prototype.nationality = "Malaysia";

twx.sayHello();

var ljy = new Person("ljy");
ljy.sayHello();
console.log(twx, ljy);

console.log(ljy.nationality); // Malaysia
