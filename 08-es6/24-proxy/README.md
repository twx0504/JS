# Proxy

> - create an interceptor layer (wrapper) around the target object.
> - provide traps to intercept or even redefine the fundamental operation (Internal Methods) for that target object.

## Constructor


> - creates a proxy object. 
> - If handler is not provided / not an object, TypeError is thrown.
> - If handler is an empty object, all operations on proxy are forwarded to the target (proxy behaves like original target).

```js
// new Proxy(target, handler);
// 1. target: an original object to be wrapped by the proxy.
// 2. handler: an object with traps / methods to intercept and redefine specific operations on the target.

const obj = {
    a:1,
    b:2,
}

// Define Traps in Handler Object.
// Each trap is a function inside the handler object that intercepts a specific operation.
const handler = {
    // Example of traps:
    // Intercept reading of properties. (Invocation of [[GET]])
    get(target, prop, receiver){
        // logic...
    },
    // Intercept setting of properties. (Invocation of [[SET]])
    set(target, prop, val, receiver){
        // logic...
    }
}

// Create a proxy for obj.
const proxy = new Proxy(obj, handler);

// After creating a proxy, we will use proxy in place of the target obj
// to access, set, and perform other object operations.
proxy.a; // call proxy.[[GET]] -> the get trap will be triggered if defined.
proxy.b = 10; // call proxy.[[SET]] -> the set trap will be triggered if defined.
```

## Proxy Handler

```js
const target = {
    a:1,
    b:2
}
const proxy = new Proxy(target, {
    get(target, prop, receiver){},
    set(target, prop, val, receiver){},
    // ... more traps
})
```


| No  | Trap                                         | Internal Method         | Intecepts...                                                                                          | Return Value                                                   |
| --- | -------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1   | `get(target, prop, receiver){}`              | `[[Get]] `              | `proxy.a` and equivalent.                                                                             | any value, representing the property value.                    |
| 2   | `set(target, prop, val, receiver){}`         | `[[Set]]`               | `proxy.a = 2` and equivalent.                                                                         | Boolean                                                        |
| 3   | `has(target, prop){}`                        | `[[HasProperty]]`       | `"a" in proxy`                                                                                        | Boolean                                                        |
| 4   | `deleteProperty(target, prop){}`             | `[[Delete]]`            | `delete proxy.b`                                                                                      | Boolean                                                        |
| 5   | `defineProperty(target, prop, descriptor){}` | `[[DefineOwnProperty]]` | `Object.defineProperty`, `Object.defineProperties`                                                    | Boolean                                                        |
| 6   | `ownKeys(target){}`                          | `[[OwnPropertyKeys]]`   | `Object.getOwnPropertyNames`, `Object.getOwnPropertySymbols`, `for..in`, `Object.keys/values/entries` | array-like object with non-duplicated string / symbol items.   |
| 7   | `getPrototypeOf(target){}`                   | `[[GetPrototypeOf]]`    | `Object.getPrototypeOf`                                                                               | object or null                                                 |
| 8   | `setPrototypeOf(target, prototype){}`        | `[[SetPrototypeOf]]`    | `Object.setPrototypeOf`                                                                               | Boolean                                                        |
| 9   | `getOwnPropertyDescriptor(target, prop){}`   | `[[GetOwnProperty]]`    | `Object.getOwnPropertyDescriptor`, `for..in`, `Object.keys/values/entries`                            | object or undefined                                            |
| 10  | `isExtensible(target){}`                     | `[[IsExtensible]]`      | `Object.isExtensible`                                                                                 | Boolean                                                        |
| 11  | `preventExtensions(target){}`                | `[[PreventExtensions]]` | `Object.preventExtensions`                                                                            | Boolean                                                        |
| 12  | `apply(target, thisArg, args){}`             | `[[Call]]`              | `proxy()`, `proxy.call()`, `proxy.apply()`                                                            | any value, representing the return value of the function call. |
| 13  | `construct(target, args, newTarget){} `      | `[[Construct]]`         | `new proxy()`                                                                                         | object, representing the newly created instance.               |


**Note:**
1. Reflect methods also trigger proxy traps.
2. It is recommended to use Reflect methods inside traps to forward operations to the target.
3. `receiver` of `get` & `set` trap refers to proxy itself, and using `Reflect.get` and `Reflect.set` ensures proper `this` binding for getters and setters.
4. Proxy traps must obey JavaScript's invariants, otherwise, violation will throw `TypeError`.
    - It has to do with the object extensibility, or the property's configurability & writability.
    - Proxy traps cannot lie about the target. e.g., claiming a non-configurable property was deleted.

## `this` Issue

1. When using proxy in place of target, `this` inside the target methods refers to `proxy`, not the original target.
2. Some methods rely on correct `this` (being original target) to work correctly.
   1. Built-in Objects (Date, Map, Set, etc)
   2. Private data stored in a WeakMap using the original target as key.
3. If `this` being proxy, these methods can fail because their internal slot require the actual target as `this`, not the proxy.


**Why proxying instance can break methods that depend on actual target as this?**
**A. Custom Instance**
```js
const privates = new WeakMap(); // This acts as an internal slot.
class Stack {
  constructor(size) {
    this.size = size;
    privates.set(this, []);
  }

  push(val) {
    console.log(this);
    // when using proxy, privates.get(this) returns undefined.
    // undefined.push(val) throws exception.
    privates.get(this).push(val);
    return this;
  }

  view() {
    console.log(this);
    console.log(privates.get(this));
  }
}
const stack = new Stack(10);
// Directly proxying an instance of Stack can cause issues with "this".
// Some instance methods may break because `this` is no longer the target, but a proxy.
const proxy = new Proxy(stack, {});

// Proxying the class itself works fine because the constructor correctly sets "this".
// - useful if you want to intercept the construction process / static method access.
// const proxy = new Proxy(Stack, {});
```

**B. Built-in Objects:**
```js
// Some built-in objects cannot be proxied.
// Their methods require "this" to be the actual instance, not a proxy.
const date = new Date();
console.log(date); // Sat Nov 29 2025 19:04:24 GMT+0800 (Malaysia Time)
const proxy = new Proxy(date, {
    get(target, prop) {
        if (prop === "getDate") {
        // Make sure the getDate method's this always refers to the actual Date instance.
        return target[prop].bind(target);
    }
     return target[prop];
    }
});
console.log(proxy.getDate()); // Works correctly, prints the day of the month
console.log(proxy.getMonth()); // Works too if you bind it the same way, otherwise may throw
```