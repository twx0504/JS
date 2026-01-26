# Object Literal Enhanced

1. Shorthand Property: when the obj key and variable identifier are same, we can use shorthand property.

```js
const age = 25;
const student = {
    age, // similar to age: age
}
```

2. Shorthand Method

```js

const student = {
    work(){}, // work: function(){}
    sleep(){} // sleep: function(){}
}

```

3. Getter & Setter

```js
// ES6
const student = {
    _sex: "male",
    get sex(){
        return this._sex;
    },
    set sex(val) {
        this._sex = val;
    }
}

// ES5

const student = {
    _sex: "male",
}

Object.defineProperty(obj, "sex", {
    get: function(){
        return this._sex;
    },
    set: function(val){
        this._sex = val;
    }
});
```

4. Computed Property 

```js
const age = "age";
const moneySymbol = Symbol("money");
const username = ()=> "username001";

const person = {
  // These are computed properties, available since ES6.
  // Syntax: [expression]: value
  [age]: 25,                     // key: "age"
  [moneySymbol]: 1000,          // key: Symbol("money")
  [username()]: "twx0504",      // key: "username001"
  ["s" + "ex"]: "male",         // key: "sex"
  [1 + 4]: 5,                   // key: "5" (number is coerced to string)
  [{}]: "obj"                   // key: "[object Object]"
};

console.log(person.age);
console.log(person.sex);
console.log(person[username()]); // or person.username001 
console.log(person[moneySymbol]); // symbol can only be accessed using square notation.
console.log(person[{}]); 

// note: 
// - access using finalized key string.
// - All keys except symbols are converted to strings.
// use [] notation if your key is an expression.
```
