# Object Oriented
[TOC]
## 01 Understanding Objects

> Everything in JS are objects. 
> Object = properties (its features) + methods (what it can do).
> In JS, objects are a collection of unordered key:value pairs.

> Why do we need objects?
> - storing information of an object (e.g., phone, user) using a variable or an array is difficult and not relevant 
> - object provides a better structure to store these information as key-value pair in one place, and we could know what each value is based on key.

```js
// Variables - we need to define many variables to store related message of the user.
var name = "Too Wei Xin";
var age = 25;
var status = "Unemployed";

// Array - although it can gather all the information of the user in one place, but it is difficult to guess what each item really is
var person = ["Too Wei Xin", 25, "Unemployed"];

// Object - with object, the structure is clearer.
var user = {
    name: "Too Wei Xin",
    age: 25,
    status: "Unemployed",
    sleep() {
        console.log("I like sleeping");
    },
    "to-Eat"(){
        console.log("Eat what?")
    }
}
```

> object values can be any type (e.g., function)
> object method is actually function storing inside object.

### 1.1 Creating Objects

> - object literals / object initializer {}
> - new Object()
> - Object.create()
> - constructor function / class

```js
var obj = {
    key: value,
    key: value,
}

var obj = {};
```
> Naming convention of Keys:
> - if object key follows the JS naming convention for identifier, it do not need to be quoted.
> - otherwise, you need a quote "" or ''.

```js
var name = "myName";
var user = {
    [name]:"Too Wei Xin",
    ["age"]: 25,
    "to-Sleep"() { 
        console.log("To Sleep");
    },
    #private() {
        console.log("I have a secret");
    },
    $bank(){
        console.log("How much gold I have in my vault?");
    }
    
}
```

### 1.2 Object Basic Operations

#### 1.2.1 Accessing Properties

> - property accessor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors

- `obj.prop`
- `obj["prop"]`
- `obj[variable]`

> - if the property you access doesn't exist, it returns `undefined`.

#### 1.2.2 Adding / Modifying Properties

-`obj.prop = newValue`
-`obj["prop"] = newValue`
-`obj[variable] = newValue`

> - if the prop doesn't exist, it adds new property with value supplied.
> - if the prop already exists, it modifies the property values.

```js
var count = "TravelCount";
var user = {
    name: "Too",
    age: 25,
    
}

// Modifying property values
user.name = "Koh";
user.age = 30;
user[count]++;
user[count]+= 3;

// Adding properties
user.status = "single";
user.career = "frontend";
```

#### 1.2.3 Calling Methods

- `obj.prop()`
- `obj["prop"]()`
- `obj[variable]()`

> - e.g., Math.random() where random is a method of Math object.

#### 1.2.4 Object Traversal

> - for...in ... loop
> - it traverses through each key of the object.
> - traverses only the key that is not Symbol type.
> - note: for...in... can get properties you defined on the prototype!


```js
var s = Symbol("Symbol Property");

var phone = {
  brand: "Apple",
  [s]: "5.6",
  color: "Black",
  weight: "100g",
  quality: "Aluminium",
  call: function () {
    console.log("Call");
  },
  playGame: function () {
    console.log("Play");
  },
  "to-Eat"() {
    console.log("Eat what?");
  },
};

for (var key in phone) {
  console.log(key);
}

// brand  <- note: s is not printed! For ... in ... loop traverses through non-symbol keys.
// color
// weight
// quality
// call
// playGame
// to-Eat

```

> - array is also an object, each index is actually key!

```js
var scores = [99, 80, 25, 30];
for (var index in scores) {
  console.log(index, scores[index]);
}
// 0 99
// 1 80
// 2 25
// 3 30
```

### 1.3 Copying Objects

> - object is reference type.
> - it is accessed by reference.

**Shallow Copy**

> - use for...in... loop
> - add each object key value pair to the new object. `newObject[key] = obj[key]`

**Deep Copy**

> - clone every layers, including the nested reference data type.
> - copiedObj looks like obj but they are two independent objects!
> - consider array and object, other types like set, map will be added later.

```js
function deepCopy(obj, deep = true) {
  var res;
  if (obj === null) return;
  if (Array.isArray(obj)) {
    res = [];
    if (deep) {
      for (var i = 0; i < obj.length; i++) {
        res.push(deepCopy(obj[i], deep));
      }
    } else {
      return obj.slice();
    }
  } else if (typeof obj === "object") {
    res = {};
    for (var k in obj) {
      if (deep) {
        res[k] = deepCopy(obj[k], deep);
      } else {
        res[k] = obj[k];
      }
    }
  } else {
    // if obj is primitive or functions
    return obj;
  }
  return res;
}
```

### 1.4 This

> `this`: the execution context a piece of code (e.g., function body) is supposed to run.
> `this` is determined by how a function is invoked, not where it is defined.
> Tips: this refers to whoever calls the functions / methods.
>   - in global context, `this` refers to `window` object in browser environment.
> example scenarios: 
>   - invoke as a standalone function,  this refers to `window` object (non-strict mode) / `undefined` (strict) 
>   - invoke function as a method of an object, `this` points to that object.
>   - `Function.prototype.apply()` and `Function.prototype.call()` can change this for a particular call.
>   - `Function.prototype.bind()` can create a function whose this binding doesn't change.
>   - Function call as a constructor.

#### 1.4.1 Case 1: Invoking a Standalone Function

> - `fn()` is `window.fn()` so `this` refers to window.

```js
// Global Context
function fn() {
  //   "use strict";
  console.log(this);
}

// when the fn is in non-strict mode, it is similar to global.fn() this points to global.
// when the fn is in strict mode, this refers to undefined.
fn();


// IIFE - this refers to  global. In strict mode, it is undefined.
(function () {
  // "use strict";
  console.log(this);
})();
```

#### 1.4.2 Case 2: Invoking Function as a Method of an Object

> - `this` refers to the `object` who calls the method.

```js
var person = {
  name: "Too Wei Xin",
  sleep() {
    console.log(this);
  },
};

person.sleep(); // { name: 'Too Wei Xin', sleep: [Function: sleep] } this refers to person

// Caveat:
var sleep = person.sleep; // assign the reference of sleep function to sleep variable.
sleep(); // this refers to global. (it is similar to global.sleep()) it is global who calls sleep now, not object anymore.

// Array - index is key for array.
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

```

#### 1.4.3 Case 3: Change this Using `Call` / `Apply`

> - call / apply is similar to function call `fn()` except you pass thisArgs as the first argument.

> - when a function is invoked using call or apply with a thisArgs, it is similar to thisArgs.fn() where thisArgs could refers to an object.
> temporarily treat this inside fn as thisArgs.

```js
Function.prototype.call(thisArgs, ...args)
Function.prototype.apply(thisArgs, argsArr)

// fn.call(obj, arg1, arg2, arg3) is similar to obj.call(arg1, arg2, arg3)
```


> Caveats:
> - when thisArgs === null / undefined, it becomes window object in browser.
> - if thisArgs is primitive, the primitive is converted to object `Object(primitive)`.

#### 1.4.4 Case 4: Bind

> - similar to call / apply
> - return a bounding function binding to thisArgs and initial arguments.

```js
Function.prototype.bind(thisArgs, ...args)
// fn.bind(obj, arg1, arg2, arg3) returns a new function that is bound to obj and contains initial arguments.
// newFn() is similar to obj.newFn(arg1, arg2, arg3)
```

> note: 
> - if the bounding function is used as a constructor with new keyword, the construction will prepare its own this context, ignoring the thisArgs of bind.

## 02 Constructor


### 2.1 Factory Methods
> - create a bunch of similar object of a particular class (e.g., person)
> - Mary, Too Wei Xin, Lau Jing Yi...


**Design Pattern: Factory Method**

```js
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
```

### 2.2 Constructor

**Constructor**

> - when a function is called with `new`, it is treated as a constructor, and return an instance.
> - use: create and initialize an instance.
> - PascalCase as the naming convention (First letter is capitalized). Note: camelCase is not throwing error, but not recommended.
> - instance's `instance.__proto__` / `instance[[prototype]]` points to Constructor's prototype `Constructor.prototype`
```js
function Person(name, age, sex) {
  // Internal Mechanism:
  // 1. var obj = {}
  // 2. obj.__proto__ = Person.prototype
  // 3. this = obj;
  // 4. execute codes in function body, resembles adding new property to obj.
  // 5. return obj 
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.sayHello = function () {
    console.log("Hello, I am " + this.name);
  };
  console.log(this); // if calling without new, this refers to window / global
}

var twx = new Person('twx', 25, 'male'); // it is like twx = this (internal) = obj (internal)
```

**Problem:**

> - methods inside constructor will be created for each instance, creating some memory overhead, but these methods actually do the same thing.

```js
function Person(name) {
  this.name = name;
  this.sayHello() {
    console.log("Hello it is ", this.name);
  }
}

```

> - put methods as global function, but it pollutes the global scope because the method is only used for object.

```js
function Person(name) {
  this.name = name;
  // define method inside constructor might create extra overheads.
}

// We define it as a global function.
function sayHello() {
  console.log("Hello it is ", this.name);
}

const wilson = new Person("wilson");
sayHello.call(wilson);

const too = new Person("too");
sayHello.call(too);
```

> solution: put on Constructor.prototype!

## 03 Class and Instances

### 3.1 Understanding Class and Instances
> - class: category / blueprint / template that defines a type of object - can be broad / specific. 
> - instance: specific example on a particular category. 

| Class  | Instance                             |
| ------ | ------------------------------------ |
| Person | wilson, jingyi, weixin               |
| Dog    | husky, bulldog                       |
| Apple  | green apple, red apple               |
| Bag    | weixin's bag, your bag, wilson's bag |


### 3.2 Class and Instance in Js

> - class is used to define the properties and methods an instance will have, but it doesn't intialize it with values, unless there's default values or user passes arguments as values to these properties.
> - constructor is similar to class in this sense (ES6+ introduces class syntax)

> - instance is an object (JS object)

> - Calling constructor with new keyword, it instantiates an instance / object of that class / constructor.
> - Object instantiation: The process of creating an instance of a particular class.


```js
function Ball(r, color, opacity, x, y) {
  this.radius = r;
  this.diameter = r * 2;
  this.color = color;
  this.opacity = opacity;
  this.x = x;
  this.y = y;
  this.init = function () {
    // initialization: put it on the dom.
    // this.dom add a new property dom to the ball instances.
    this.dom = document.createElement("div"); // in memory
    // set styles on div
    this.dom.style.width = this.diameter + "px";
    this.dom.style.height = this.diameter + "px";
    this.dom.style.borderRadius = this.radius + "px";
    this.dom.style.backgroundColor = this.color;
    this.dom.style.opacity = this.opacity;
    this.dom.style.position = "absolute";
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    document.body.appendChild(this.dom); // insert div into dom
  };
  this.move = function () {
    this.dom.style.left = this.x + 250 + "px";
    this.dom.style.top = this.y + 250 + "px";
  };
  this.changeColor = function () {
    this.dom.style.backgroundColor = "skyblue";
  };
}

var pink = new Ball(100, "pink", 0.5, 100, 100);
var blue = new Ball(200, "blue", 0.8, 200, 200);
var green = new Ball(1000, "green", 1, 300, 300);
pink.init();
blue.init();
green.init();

```

> JS is object-based language unlike class-based languages like Java / C++.
> Class syntax introduced in ES6+ is a syntactic sugar allows JS developers to use class-based approach like other OOP languages.
> Under the hood, classes in Js are still implemented based on prototype (prototype chain).


### Object(val) Constructor

> note: Almost all objects in JS is constructed using Object constructor.

> if val is `undefined` / `null` / not passed, it returns an object.
> if val is primitive, it returns the wrapper object of the primitive.
> if val is an object, it returns the object (e.g., {} / []).

```js
new Object(val)
```

**Wrapper Object**

> - this explains why we could access property / methods from primitive type.
> - the primitive data is wrapped with a temporary wrapper object when accessing properties or call methods on them.
> - this wrapper object contains different methods for us to operate on the data.

```js
var str = "abc";
str.charAt(0); // Why is this possible？

// Note: Under the hood, it is like this
// var strObj = new Object(str);
```

> use case: when you want to receive an argument that is object type, you can use Object to convert the argument received.

## 04 Prototype and Prototype Chain

### 4.1 What is Prototype?
![prototype](prototype.png)

> - prototype is a property on all function, but it is only becoming useful if you invoke functions as constructors with `new`.
> - Fn.prototype holds an object that acts like a shared room - a place where you can define common properties and methods.
> - Every instance created using the constructor Fn will have internal access to Fn.prototype via `__proto__` property.
> The existence of prototype allows all instances to share similar behaviours (properties / methods) without needing each instance to carry its own copy.
> - Fn.prototype contains a property named constructor, pointing back to the constructor.

```js
function Person(name) {
  this.name = name;
}

// Define common properties / methods on Person.prototype
Person.prototype.sayHello = function () {
  console.log("Hello I am", this.name);
};
Person.prototype.nationality = "Malaysia";

var ljy = new Person("ljy");
// Accessing those properties / methods from instance.
ljy.sayHello();
console.log(ljy.nationality); // Malaysia

```

### 4.2 Prototype Chain Lookup

![prototype chain](prototype-chain.png)
> - when accessing a property or calling a method, js will look for the property / method from the object itself.
> - if the property / method exists, then it will use what it has. (Shadowing)
> - if the property / method doesn't exist, then it will look it up along the prototype chain.
> - The lookup proceeds until the end of the chain and returns `undefined` if not found.
> - so that is why when we access a property that doesn't exist, it returns `undefined`.


> **Note:**
> - All objects have access to `Object.prototype`.
> - `Object.prototype.__proto__` is null.
> - All constructors (e.g., Object, Array, Test, etc.) are instances created by Function Constructor.
> - All prototypes are objects except `Function.prototype` which is a function.
> - `Function.__proto__ === Function.prototype` means both points to Function prototype.
> - `Function.prototype.__proto__ === Object.prototype` means Function.prototype inherits from Object.prototype.
> - `Function.__proto__.__proto__ === Object.prototype` means Function inherits from Object.prototype.

> Note:
> - toString of Array supposedly inherits from Object.prototype. However, it has been overriden by some object in Js, such as Array.


### 4.3 `hasOwnProperty`

> check if an object has a specific property that is not inherited.

```js
obj.hasOwnProperty(key)

```

### 4.4 `in` operator

> check if an object has a specific property or property that is inherited from its prototype chain.


```js
key in obj

```


### 4.5 `instanceof`

> check if the prototype of the constructor is present anywhere along the prototype chain of the object.

```js
obj instanceof constructor
```
**Caveat: Constructor from Different Realm:**

> - constructors from another realm (iframe) are not identical to the current realm's constructors.
> - realm: an environment that has its own global object & built-in object.

```html
<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik" frameborder="0"
></iframe>
<script>
  var iframeArray = window.frames[0].Array;
  console.log(iframeArray === Array); // false
  var arr = [1, 2, 3];
  console.log(arr instanceof Array); // true
  console.log(arr instanceof iframeArray); // false 
</script>
```

## 05 Convert Array-Like Object to Array

```js
function sum(a, b, c) {
  /* Use call! */
  var arr = Array.prototype.slice.call(arguments); // arguments.slice
  console.log(arr);
}

```


## 06 Object.prototype.toString()

> - returns a string representing this object.
> - `[object type]`
> - However, most objects has overriden this method.
> - to use it, you need to use `call`!
> - use case: checking type.


```js
// Using this is returning the same result [object Object].
Object.prototype.toString(1); // '[object Object]'
Object.prototype.toString(true); // '[object Object]'
Object.prototype.toString({}); // '[object Object]'
Object.prototype.toString([]); // '[object Object]'

console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call({})); // [object Object]
console.log(Object.prototype.toString.call([])); // [object Array]
```


**What are the methods to check types?**

| Methods                            | Description                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `typeof`                           | check types for primitive & function <br/> array, null, object returns object                     |
| `Array.isArray(val)`               | only check array                                                                                  |
| `Object.prototype.toString.call()` | check any types.                                                                                  |
| `obj instanceof constructor`       | check instances of particular constructor/ class.                                                 |
| `fn.prototype.constructor === fn`  | check if an instance is created by the constructor. <br/> not safe, constructor can be rewritten. |
| `Object.prototype.toString.call()` | check any types.                                                                                  |

**What are the methods to check property of an object?**
| Methods                   | Description                                                                   |
| ------------------------- | ----------------------------------------------------------------------------- |
| `key/symbol in obj`       | check property exists on obj and its prototype chain   .                      |
| `obj.hasOwnProperty(key)` | check property that only exists on the obj and not inherited from prototypes. |

## 07 Implementation

### 7.1 Implementation of Call

> concept: f`n.call(thisArgs)` means treating fn as the method of thisArgs `thisArgs[key] = fn`

```js
var obj = {}
function myFn() {}
// Call: change the this of myFn to obj.
// internally, we want to achieve obj.myFn() so we want to make myFn to be the method of the obj.
// Q1: What is this inside call? myFn.call() so this inside call refers to the function itself.
// Q2: How do we make myFn to be the property of obj? obj[key] = myFn
// Q3: What is key? A random identifier that is unique and not conflicted with the property name of the obj.
myFn.call(obj);
```

> implementation of call:
> 1. Function.prototype._call = function(context) {}
> 2. check if this is not a function, throw error.
> 3. convert null / undefiend to globalThis
> 4. convert primitive to wrapper object
> 5. create a unique key
> 6. `context[key] = this`
> 7. `var res = context[key](？？？)` + passing argument dynamically
> 8. `delete context[key]`
> 9. return res


important points:
- generate unique key
  - ES6: Symbol.
  - ES5: Math.random + Date.now
- dynamic argument passing
  - ES6: Spread operator
  - ES5: Function constructor

### 7.2 Implementation of Apply

> implementation of apply:
> similar to call, except the arguments are passed in the form of an array.

### 7.3 Implementation of Bind

> implementation of bind:
> var args = []
> var fn = this;
> looping through arguments starting at index 1.
> define inner boundingFn
> - var restArgs = []
> - looping through arguments starting at index 0.
> - var finalArgs = args.concat(restArgs)
> - checking if the boundingFn called with new (this instanceof boundingFn / new.target)
>   - ES6: return new fn(...finalArgs);
>   - ES5: mimicking how new Constructor working under the hood
>     - var instance = Object.create(fn.prototype)
>     - var res = fn.apply(instance, finalArgs)
>     - checking if the res is an object type and is not null (user-defined return value), return res
>     - return instance 
> - otherwise, return fn.apply(context, finalArgs)
> return boundingFn