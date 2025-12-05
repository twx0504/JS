# Reflect

> - directly invokes interceptable Object Internal Methods (interceptable = operations that Proxy traps can catch and customize).
> - not a constructor.
> - allow us to perform object operation as function calls instead of using operators / Object static methods.


```js
const obj = {
    a: 1,
    b: 2,
    get d(){
        // What is `this` referring to?
        // Is it refers to obj? 
        // Not necessary!
        // `this` inside getter / setter is determined by receiver of the [[GET]](target, prop, receiver).
        console.log(this);
        return this.a + this.b;
    }
};

Object.defineProperty(obj, "c", {
    value: 3,
    enumerable: false, // Non-enumerable key.
});

// Example of Object operations
// - These operators / Object static methods trigger the underlying
//   Object Internal Methods indirectly. JS may perform extra work
//   before or after calling the internal method.

obj.a = 10; // [[SET]]
obj.a; // [[GET]]
delete obj.a; // [[DELETE]]
Object.setPrototypeOf(obj, {a:1}); // [[SetPrototypeOf]]
Object.getPrototypeOf(obj); // [[GetPrototypeOf]]


// Example 1: Operations that use multiple Internal Methods internally
Object.keys(obj); // ["a", "b", "d"] 
// Note: 
// - "c" doesn't appear because Object.keys only returns enumerable own keys.
// - Object.keys first calls [[OwnPropertyKeys]] to get a full list of own keys
// - then for each key it retrieves the property descriptor via [[GetOwnProperty]]
// - to check whether the key is enumerable.
// So, this high-level Object methods may combine several Object Internal Methods.
// What if we only want a full list of keys, regardless of the keys' enumerability?
// - Reflect.ownKeys allows you to get the full list of keys!
Reflect.ownKeys(obj); // ["a", "b", "d", "c"]

// Example 2: Modifying Accessor Properties's `this` with Receiver. 
// [[GET]](target, prop, receiver): `receiver` determines `this` inside getter/setter
console.log(obj.d); // [[GET]](target, prop, target) - By default, target is passed as receiver.
// {a: 1, b: 2, c: 3}
// 3

// `this` inside getter / setter can be modified.
// Reflect.get(target, prop, receiver) allows us to do just that.
console.log(Reflect.get(obj, "d", {a: 100, b: 200}));
// {a: 100, b: 200}
// 300


// Example 3: Making Getter & Setter interceptable with Proxy
const proxy = new Proxy(obj, {
    get(target, key, receiver){
        console.log(key);
        // Returning target[key] calls [[GET]] with receiver = target,
        // so the getter's `this` will be the original object, not the proxy.
        return target[key];
    }
});

console.log(proxy.d); 
// d
// {a: 1, b: 2, c: 3} - this is not proxy - where is a & b? They are not intercepted by Proxy because of `this` being target, not the proxy.
// 3

// To make getter/setter operations interceptable,
// you must forward the receiver correctly via Reflect.get:
const proxy2 = new Proxy(obj, {
    get(target, key, receiver){
        console.log(key);
        // Now receiver === proxy2, so `this` inside getter becomes the Proxy.
        return Reflect.get(target, key, receiver); 
    }
});
console.log(proxy2.d);
// d
// Proxy(Object) {a: 1, b: 2, c: 3}
// a
// b
// 3
// When `this` inside getter / setter now refers to proxy2,
// so the object operations (e.g., this.a, this.b) inside the getter / setter are intercepted by proxy2's traps.
```

## Reflect Static Methods

> - Each static methods has the same name as a corresponding proxy traps.
> - Each methods directly calls a specific Object Internal Method.
> - Arguments for each method match the arguments of the corresponding proxy traps.


| No  | Methods                                              | Internal Method         | Return Value                                 |
| --- | ---------------------------------------------------- | ----------------------- | -------------------------------------------- |
| 1   | `Reflect.get(target, prop [, receiver]){}`           | `[[Get]] `              | value of property                            |
| 2   | `Reflect.set(target, prop, val [, receiver]){}`      | `[[Set]]`               | Boolean                                      |
| 3   | `Reflect.has(target, prop){}`                        | `[[HasProperty]]`       | Boolean                                      |
| 4   | `Reflect.deleteProperty(target, prop){}`             | `[[Delete]]`            | Boolean                                      |
| 5   | `Reflect.defineProperty(target, prop, descriptor){}` | `[[DefineOwnProperty]]` | Boolean                                      |
| 6   | `Reflect.ownKeys(target){}`                          | `[[OwnPropertyKeys]]`   | array of target's own keys (string & symbol) |
| 7   | `Reflect.getPrototypeOf(target){}`                   | `[[GetPrototypeOf]]`    | prototype / null                             |
| 8   | `Reflect.setPrototypeOf(target, prototype){}`        | `[[SetPrototypeOf]]`    | Boolean                                      |
| 9   | `Reflect.getOwnPropertyDescriptor(target, prop){}`   | `[[GetOwnProperty]]`    | descriptor / undefined                       |
| 10  | `Reflect.isExtensible(target){}`                     | `[[IsExtensible]]`      | Boolean                                      |
| 11  | `Reflect.preventExtensions(target){}`                | `[[PreventExtensions]]` | Boolean                                      |
| 12  | `Reflect.apply(target, thisArg, args){}`             | `[[Call]]`              | fn return value                              |
| 13  | `Reflect.construct(target, args [, newTarget]){} `   | `[[Construct]]`         | instance of target (or newTarget if present) |

**Note**:
- TypeError will be thrwon if the following constraints are violated:
   1. `target` must be object for all Reflect static method.
   2. `target` must be function for `Reflect.apply`.
   3. `target` must be constructor for `Reflect.construct`.
   4. `newTarget` must be constructor for `Reflect.construct.`
   5. `prototype` must be an object / null for `Reflect.setPrototypeOf`.
   6. `descriptor` must be object for `Reflect.defineProperty`.
   7. `argumentsList` must be array-like object for `Reflect.apply` & `Reflect.construct`.


> Some Reflect methods return Boolean, compared to their `Object.xxx` counterpart, which may throw error.
> - e.g., `Object.defineProperty`, `Object.setPrototypeOf` throws on failure, which may require try...catch.
> - e.g., `Reflect.defineProperty`, `Reflect.setPrototypeOf` returns false on failure, which is more predictable, and matches the return value (Boolean) expected by the corresponding Proxy traps.


```js
const a = {
    a:1,
    b:2,
};

const b = {
    x:1,
    y:2,
};

// Make object a non-extensible, so its prototype cannot be changed.
Object.preventExtensions(a);

// Throws error, requires try...catch
Object.setPrototypeOf(a, b); // Uncaught TypeError: #<Object> is not extensible

// Returns Boolean, does not throw, can be used in conditionals
Reflect.setPrototypeOf(a, b); // false
```