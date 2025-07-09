# Set

> - Holding strong references.

## 1.1 Create Set Instance

```js
// Creating a set instance

// 1. Empty set, using add method to insert item.
new Set();

// 2. Pass an iterable such as array with predefined item.
new Set(iterable);
```

## 1.2 Set Instance Property & Methods

**Instance Property**

1. size

**Instance Methods**

1. add(value): add a value to the set. support method chaining.
2. delete(value): delete any value from the set.
3. has(value): check if a value exists in a set.
4. clear(): clear / remove all the set items.

## 1.3 Set Traversal

> - using `for...of` loop to iterate over a set.
> > - for...of loop internally calls the `Symbol.iterator` method of the iterable
> > - this method returns an iterator with a next method.
> > - the loop repeatedly calls the `next` method, and assigning the value to the loop variable.
> > - for...of loop exits when the `next` method result is an object with {done:true}.
> > - using control flow statement like `break` and `continue` is allowed.
> > > - break: immediately exit the for...of loop.
> > > - continue: skip the current iteration and proceed to the next `next` method call.

```js
const s = new Set([1, 2, 3, 4, 5]);
for (const variable of s) {
    // code...
}
```
> - set has a property called `Symbol.iterator` whose value is the same as `values` method.
> - note: iterator returned by the following method can only be used once.

1. values - get an iterator containing value of the set in the insertion order.
2. keys - alias of values
3. entries - get an iterator containing arrays of [value, value] pair of the set in the insertion order.

## 1.4 Destructuring and Spread Operator

> - set follows the array destructuring pattern because set is an iterable.

```js

const [a, b, c] = new Set([1, 2, 3]);
```

> - use array spread operator on set

```js
const setA = new Set([1, 2, 2, 2, 3, 4, 5]);

console.log(...setA);

const newArr = [...setA];

```


## 1.5 Set Applications

1. Deduplication of array items.
2. Implementation of mathematical set operation.
   1. union
   2. interception
   3. difference
   4. symmetrical difference
   5. superset
   6. subset
