# WeakMap

> - do not preserve the insertion order of key-value pair.
> - only allows object references / non-registered symbols as keys.
> - values can be any arbitrary data type.
> - hold weak reference to its keys.
> - hold strong reference to its values.


## 1.1 Creating WeakMap

```js
const weakmap = new WeakMap();
const weakmap = new WeakMap(iterable);
```

## 1.2 Instance Methods

1. set(key, value) - note: support method chaining.
2. get(key)
3. has(key)
4. delete(key)

> - WeakMap cannot be enumerated.
> - property that is absent:
> > - size

> - methods that are absent:
> > - keys, values, entries, forEach
> > - clear 
