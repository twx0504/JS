# Classes

## 1.0 ES5 Inheritance

```js
function Parent(x, y){
    this.x = x;
    this.y = y;
}

Parent.childNum = 0;

function Child(x, y, z){
    this.z = z;
    // #1: Instance Property Inheritance
    Parent.call(this, x, y);
    Parent.childNum++;
}

// #2: Instance Method Inheritance
// const prototype = Object.create(Parent.prototype);
// Child.prototype = prototype; // Note: This completely replaces the entire Child.prototype, things like constructor / some instance methods will be disappeared.
// Child.prototype.constructor = Child;

// it is similar to Child.prototype.__proto__ = Parent.prototype
// Note: Object.setPrototypeOf() only modify the Child.prototype.__proto__, it preserves constructors and other instance methods.
Object.setPrototypeOf(Child.prototype, Parent.prototype);


// How do we inherit the static props?
// Child.__proto__ = Parent;
// const c1 = new Child(1, 2, 3);
// const c2 = new Child(4, 5, 6);
// console.log(Child.__proto__.childNum);

// However, using __proto__ is not great.
// __proto__ exists as legacy, and is discouraged to be used.
// It is advisable using it only in DEVELOPMENT Mode. Never in PRODUCTION.

// Later, Object.getPrototypeOf() & Object.setPrototypeOf() methods came out.
// #3: Static Properties / Methods Inheritance
Object.setPrototypeOf(Child, Parent);

```


## 1.1 Classes Basic

```js
// Class Declaration
class A {}

// Class Expression
const A = class {}
```

```js

class Ball {
    // Static Props / Methods
    static num = 0;
    static showNum(){
        console.log(this); // class Ball {}
        console.log(this.num); // Ball.num
        
    }

    // Private Props / Methods 
    #origin = "Malaysia";
    #showOrigin(){
        console.log(this.#origin);
    }

    // Instance Props / Methods
    // - on instance
    shape;
    color = "red";
    
    // - on prototype - shared among instances - it is on instance.__proto__
    showColor(){
        console.log(this.color);
    }

    showOriginPublic(){
        console.log(this); // instance
        return this.#showOrigin();
    }

    // Instance Methods (Arrow Function)
    // - on instance
    showNothing = () => {
        console.log(this); // instance
    };

    constructor(x, y, shape){
        this.x = x;
        this.y = y;
        this.shape = shape;
        
        // Every time you create an instance, the static prop num will be increased by 1.
        Ball.num++; 
    }
    
}

const a = new Ball(1, 2, "circle");
const b = new Ball(1, 2, "circle");
Ball.showNum(); // 2
b.showOriginPublic(); // Malaysia
console.log(b.__proto__); // {showColor: ƒ, showOriginPublic: ƒ} - note: the instance methods are on the instance.__proto__.
a.showNothing(); // Ball {shape: 'circle', color: 'red', x: 1, #origin: 'Malaysia', showNothing: ƒ, …}
```



**Checking if a class inherits another class?**

> We can verify the prototype of Child. `Child.__proto__ === Parent`


```js
class Parent {}

class Child extends Parent {

}

console.log(Object.getPrototypeOf(Child) === Parent);
```


**Static Initialization Block**

> - allows us to write statements (logic) inside class, and they will be get evaluated synchronously during class initialization.
> - we can have multiple static initialization blocks in a class.
> - Each is evaluated in the order they are defined.
> - the scope of this block lives within the class lexical scope, so naturally it has access to the class field above it, not below it.

```js
let getMoney;

class A {
  #money = 2000;
  count = 1000;
  static {
    console.log(this); // "this" refers to the constructor object of the class (generally refers to class).
    console.log(this === A); // true
    // Share field access with external code.
    // Functions defined inside a class have lexical access to the class's field syntax.
    // Since these are instance fields (not static), they exist on individual instances.
    // In a static block, 'this' refers to the class constructor, not an instance,
    // so we use a parameter 'obj' to represent the instance we'll access later.
    // When called, 'obj' must be an actual instance of this class for private field access to work.

    // In the instance method, we can often write this.#money / this.count because this refers to instance!
    // in static initializatoin block, "this" is no longer an instance.
    // with some tricks, using function and passing instance allows us to expose some of the field for the external code.
    // Of course, we need to pass the instance of this class too.
    getMoney = (obj) => {
      return {
        money: obj.#money, // Private field - requires obj to be instance of A
        count: obj.count, // Public field - works on any object with 'count' property
      };
    };
  }
}

const a = new A();
//   class A {
//     #money = 2000;
//     count = 1000;
//     static {
//       console.log(this);

//       // Share field access with external code.
//       // Functions defined inside a class have …


// By passing an valid instance, we get access to the class field.
// Because function remembers where it is defined, and have access to anything from there.
console.log(getMoney(a)); 
// {money: 2000, count: 1000}

class B extends A {
  constructor() {
    super();
  }

  static {
    console.log(super.foo); // refers to the static properties of a super class.
  }
}

```


## 1.2 extends

> In ES6, the inheritance is much simpler due to the introduction of "extends" keyword.

> You can regard extends as a synthatic sugar - that eases us from writing the complex inheritance chunks of code.

> It inherits both static / instance props.

> Do note that if the Parent static props is a **reference data type**, it is shared with the Child class. And if we make modification Child.staticProp, Parent.staticProp will be affected too.

> Any constructor that can be called with new / has the prototype property can be served as a Parent class.

> Private props cannot be inherited, but accessible through inherited methods (only if Parent exposes the private props for child indirect use)

```js
// class Child extends expression {}
// expression should give rise to a constructor / class / null.

class A {
  static num = 10;
  static rack = [1, 2, 3];
  showNum(){
    console.log("number");
  }
  foo = "foo";

  constructor(x){
    this.bar = x;
  }
}

class B extends A {
  static test = "test";
}

console.log(B.num); // 10
B.num++;
console.log(A.num, B.num); // 10 11
console.log(B.rack); // [1, 2, 3]

// We need to know that if the static prop is a reference data type, A & B shares it.
console.log(B.rack === A.rack); // true
B.rack.push(100000, 200000, 300000);
console.log(A.rack, B.rack); //  [1, 2, 3, 100000, 200000, 300000] [1, 2, 3, 100000, 200000, 300000] 
console.log(B.test); // test

const b = new B();
```

```js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#extending_null
// extends null is used to create an object without inheriting from Object.prototype.
// But due to unsettled decision, this feature is not enabled.
// class A extends null {} // Uncaught TypeError: Super constructor null of A is not a constructor
// If we want to do anyway, we can try the following approach:
class NullClass extends null {
    constructor(){
        // instance -> NullClass.prototpye -> null
        // since there's no Object.prototype in the prototype chain
        // legacy accessor like __proto__ is not existed.
        // intend to use it as instance.__proto__ returns undefined.
        // thus, we need Object.getPrototypeOf() method to examine the prototype chain from instance -> NullClass.prototype -> null

        // super can't work with extends null at this stage, we need to explicitly return the object to bypass the mechanism.
        return Object.create(new.target.prototype); // create an object whose [[prototype]] is NullClass.prototype

        // instance -> Object.prototype -> null (not what we want)
        // return {}; 


        // instance -> null (not what we want, and this object created cannot inherit methods from NullClass.prototype)
        // return Object.create(null);
    }
}

// expression:
const Parent = class {};

class A extends Parent {}


```


## 1.3 super

> super keyword is used in Child class.
> super is only meaningful with `extends` keyword.
> There are two forms of super: function & object, depending on the scenarios.

```js

super(...args)
super[expr]
super.prop

```

> Scenario:

> 1. super is used as a function call in the constructor before `this` is used and `return` statement.

```js
class A {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class B extends A {} // JavaScript provides: constructor(...args) { super(...args); }   

// OR

class B extends A {
    // If you define constructor you will need to call super(...args).
    constructor(x, y, z){
        // super refers to Parent constructor.
        // It calls the parent class constructor, and initializes the parent class's properties and fields.
        // After that, the child class constructor can further access and modify this.
        // KEY RULE: super() must run first to create the object foundation ("this" with partly initialized state), then child constructor adds its own properties"
        super(x, y); // super(...args);
        // We can only access this of Child after super call.
        // It is almost like A.prototype.constructor.call(this) but not quite due to implementation detail.
        this.z = z;

    }
}
```

> 2. super as an object in static method.
> 3. super as an object in instance method.

> Do note that writing and accessing when using super as an object have different behaviours.
> - In static methods:
> 
>> - Accessing: reads from Parent class
>> - Writing: writes to Child class
>> - Be careful when accessing the static properties that contain reference data types, as they are shared with Child class.
>
> - In instance methods:
> 
>>  - Accessing: reads from Parent.prototype
>>  - Writing: writes to Child instance
>>  - Reference data types are not a concern here, unless you define that data on Parent.prototype, in which case it is shared among instances.

```js
class A {
    static test = 1000;
    static foo(){
        console.log(this);
    }
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    bar(){
        console.log(this);
    }
}

A.prototype.count = 0;

class B extends A {
    constructor(x, y, z){
        // #1: super as a function in the constructor
        // super(...args)
        super(x, y);
        this.z = z;
    }

    static test1(){
        // #2: super as an object in the static method.
        // "this" refers to Child Class.
        // Accessing: super refers to Parent.
        console.log(super.test);
        super.foo();
        // Writing: super refers to Child.
        super.test = 2000; // it adds a static property to Child class, not an instance property
        
    }

    test2(){
        // #3: super as an object in the instance method.
        // "this" refers to instance.
        // Accessing: super refers to Parent.prototype.
        console.log(super.bar);
        console.log(super.count); // note: this instance prop is not at instance level, it is on Parent.prototype.
        
        // Writing: super refers to Child instance.
        super.name = "twx"; // it adds an instance property to the Child instance
        
        // Note: Only instance properties/methods on Parent.prototype are accessible. Instance-level properties cannot be obtained via super.

        
    }
}


```

## 1.4 new.target

> - detect whether a function / constructor was called using the new operator.
> - If new operator is used, new.target returns that function / constructor.
> - If it is a normal function call, new.target returns undefined.

**ES5**

```js
function Fn(){
    // note: in normal function call, new.target is undefined.
    console.log(new.target); // return a reference to the constructor / function invoked using the new operator.
}

const fn = new Fn();

```

**ES6**

```js

class Point {
    constructor(){
        // If derived class is called with new, new.target here refers to derived class which extends this Parent class
        // If this Parent class is called with new, new.target refers to the Parent class.
        console.log(new.target);
        console.log(new.target === Point);
    }
}

const point = new Point();

class ColorPoint extends Point {
    constructor(){
        super();
    }
}

const colorPoint = new ColorPoint();

```

**Implementing Abstract Class**

> - Abstract class is a class that cannot be instantiated directly, it serves as a blueprint for other classes.

```js
class Point {
    constructor(){
        if (new.target === Point) {
            throw new Error("This class cannot be instantiated directly with new operator, it must be inherited by other subclasses.")
        }
    } 
}

class ColorPoint extends Point {
    constructor(){
        super();
    }
}

const colorPoint = new ColorPoint();
const point = new Point(); // Uncaught Error: This class cannot be instantiated directly with new operator, it must be inherited by other subclasses.
```

## 1.5 Inheritance of Built-in Objects


**ES5 Inheritance**
> - "this" of Child is passed as the first argument into BuiltInConstructor.apply(this, ...args);
> - However, it doesn't modify the "this" we passed.
> BuiltInConstructor.apply(this, ...args) did return the desired data structure with initialized data.
> However, the ES5 constructor implicitly returns this as {}.

**Constructor Borrowing:**

```js
function Parent(x, y) {
  this.x = x;
  this.y = y;
}
function Child(x, y, z) {
  // Even we pass in obj / arr
  //   const obj = {};
  //   const arr = [];
  Parent.call(this, x, y);
  // these obj / arr still get modified.
  //   Parent.call(obj, x, y);
  //   Parent.call(arr, x, y);
  console.log(arr); // {x: 1, y: 2}
  this.z = z;
}

```


```js
function MyArray (){
    // this = {} when MyArray is called with new.
    // Constructor borrowing:
    // built-in constructor works different than our custom constructor.
    // it doesn't modify the this we pass!!!
    Array.apply(this, arguments); // we obtains [1, 2, 3] from Array.array(this, arguments) but we didnt receive it.
    // implicit return this as {}, rather than [1, 2, 3]
}

let prototype = Object.create(Array.prototype);
prototype.constructor = MyArray;
MyArray.prototype = prototype;

const myArr = new MyArray(1, 2, 3);
console.log(myArr); // MyArray {}  // NOTE: why do we get an object instead of array of MyArray[1, 2, 3]?
```

**ES6 Inheritance**

> - Inheritance follows "Parent-first" construction method.
> - When creating an instance of a child class, the parent constructor runs before child specific initialization.
> - This ensures the underlying object structure is properly established by the parent class first.
> - Later, child class adds its own.

```js
class MyArray extends Array {
    constructor(...args){
        // 
        super(...args);
    }
}

```

**Important:**
> - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object
```js

class NewObject extends Object {
    constructor(...args){
        // #1:
        // when new.target is not Object constructor
        // arguments passed into Object is ignored.
        // super here refers to Object constructor.
        super(...args);
    }
}

const obj1 = new NewObject(1); // NewObject {} - this will not be Number instance.
// const obj1 = new Object(1); // Number{1}
const obj2 = new NewObject({ a : 1 }); // NewObject {} - this will not be { a : 1 }
// const obj2 = new Object({ a : 1 }); // { a: 1 }

// #2: the obj instantiated has new.target.prototype (NewObject.prototype) as its prototype.
console.log(obj1.__proto__ === NewObject.prototype);
 
```


```js
// Implementation of shuffle method.
class NewArr extends Array {
    constructor(...args) {
      super(...args);
    }

    shuffle() {
      // randomize
      for (let i = this.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // inclusive of i as swap target.
        // swap
        [this[i], this[j]] = [this[j], this[i]];
      }
    }
}

```