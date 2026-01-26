# Spread Operator

> - support expression.

## Array Spread Operator

1. Expand the array into comma separated list. `[1,2,3]` to `1,2,3`
2. Shallow Copy
3. No effect for empty array.

```js
const arr = [1, 2, 3];
console.log(...arr); // similar to console.log(1,2,3);

```

## Object Spread Operator

1. Spreading of object key-value pairs only works in object literals.
2. All primitive can be spread into object literals but only string has effect (they have enumerable own properties).
3. Shallow copy.
4. Overriding properties where the one from behind will cover the one from front.