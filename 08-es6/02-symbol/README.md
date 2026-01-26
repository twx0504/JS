# Symbol

> - a primitive type. 
> - problem it solves: conflicting property name in an object.

**Note:**

1. Symbol cannot be converted to Number type, but it can be converted to String or Boolean.

```js
// Create unique symbol
// They may look the same, but each are different.
Symbol();

// To differentiate symbol from other symbols.
// Note: symbol with the same description is still different.
Symbol("description");

// Do not call Symbol with new!

new Symbol(); // Uncaught TypeError: Symbol is not a constructor.

```


## Symbol.for(key)

> - create and register a new symbol with a given key in the global symbol registry if not found.
> - return an existing symbol if a given key is found.

```js

Symbol.for(key)

Symbol.for("age");

Symbol.for("game.id"); // you can prefix the key if you want.

```

## Symbol.keyFor(symbol)

> - retrieve shared symbol key from the global symbol registry.
> - return undefined if not found.
> - note: well-known symbol e.g., `Symbol.iterator` are not registered in the global symbol registry and thus returning `undefined`.
```js
Symbol.keyFor(symbol);

const s = Symbol.for("color");

Symbol.keyFor(s); // "color"

```

## Object.getOwnPropertySymbols(obj)

> - return an array of all Symbol properties found directly on a given object.
> problem: we cannot get symbol properties using `for...in`, `for...of`, `Object.keys(obg)`, `Object.getOwnPropertyNames(obj)`
> To get all prorties (symbols and non-symbols): `Reflect.ownKeys(obj)`


## Usage:

1. Prevent conflicting keys inside an object.
2. Create a semi-private property that cannot be directly accessed from outside. 
3. Remove magic string (hard-coded string)