/**
 * How do we create object of similar type / class Person?
 *
 * Traditionally, we need to create each separately.
 */
var mary = {
  name: "Mary",
  age: 22,
  sex: "female",
  sayHello() {
    console.log("Hello, I am " + this.name);
  },
};

var tooweixin = {
  name: "Too Wei Xin",
  age: 25,
  sex: "male",
  sayHello() {
    console.log("Hello, I am " + this.name);
  },
};

var laujingyi = {
  name: "Lau Jing Yi",
  age: 24,
  sex: "female",
  sayHello() {
    console.log("Hello, I am " + this.name);
  },
};

mary.sayHello();
tooweixin.sayHello();
laujingyi.sayHello();

// Factory Method
function createPerson(name, age, sex) {
  var person = {};
  person.name = name;
  person.age = age;
  person.sex = sex;
  person.sayHello = function () {
    console.log("Hello, I am " + this.name);
  };
  return person;
}

var wilson = createPerson("Wilson", 25, "male");
wilson.sayHello();
var jack = createPerson("jack", 22, "male");
var robert = createPerson("robert", 26, "male");
var lee = createPerson("lee", 27, "male");

console.log(wilson, jack, robert, lee);

// If I want to create a bunch of similar dogs?
// property: name age type
// method: bark play sleep eat

// var dog = {
//   name: "Lucky",
//   age: 2,
//   type: "husky",
//   bark() {
//     console.log("Bark!!!");
//   },
//   play() {
//     console.log("Play...");
//   },
// };

function createDog(name, age, type) {
  var dog = {};
  dog.name = name;
  dog.age = age;
  dog.type = type;
  dog.bark = function () {
    console.log("Bark!!!");
  };
  dog.play = function () {
    console.log("Play...");
  };
  return dog;
}

var lucky = createDog("lucky", 2, "husky");
var apple = createDog("apple", 1, "bulldog");

console.log(lucky, apple);

console.log(typeof wilson, typeof lucky); // object object

/* Construtor */
function Person(name) {
  // Internal Mechanism:
  // 1. var obj = {}
  // 2. this = obj;
  // 3. execute codes in function body, resembles adding new property to obj.
  // 4. return obj
  this.name = name;
  console.log(this); // if calling without new, this refers to window / global
}

var me = new Person("too"); // this refers to Person { name: 'too' } - telling you this object is an instance of Person.
Person("too"); // this refers to window / global!
