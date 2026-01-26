# Destructuring

> - two destructuring patterns:
1. Binding Mode: starts with declaration keywords.

```js
let [a, b, c] = [1, 2, 3]; 

```

2. Assignment Mode: doesn't start with declaration keywords.

```js
let a;
let b;
let c;

[a, b, c] = [1, 2, 3];

```

## Array Destructuring

```js
let [a, b, c] = [1, 2, 3];
let [a = 0, b = 0, c = 0] = [1, 2, 3];

// Skipping elements
let [a,,c] = [1, 2, 3];

// rest element
// Note: Rest element must be last element
let [a, ...rest] = [1, 2, 3, 4, 5];
let {length} = rest;

// One-liner:
// rest is an array: [2, 3, 4, 5]
// we extract the .length property using object destructuring
// let [a, ...{length}] = [1, 2, 3, 4, 5];

```


## Object Destructuring

```js
let {a:_a, b:_b} = {a:1, b:2}

// short-form when the property and variable name are the same.
// let {a:a, b:b} = {a:1, b:2}
let {a, b} = {a:1, b:2}

// Nested Object Destructuring

let {a, b: {c}} = {a:1, b:{c:5}}

// rest property
// Note: Rest element must be last element
let {a, b, ...rest} = {a:1, b:2, c:3, d:4, e:5};
```


> Note: If a property is not found on the current object, it will look up in the prototype chain.