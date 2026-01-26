# WeakSet

> Almost like Set.

1. Holding weak reference.
2. Only hold object or non-registered symbol.
3. non-enumerable - you cannot iterate through the items in the collection.
4. Available methods: add delete has
5. Non-available: size, keys, values, entries, clear
6. Do not support destructuring.

## Applications

1. Detect circular reference.
2. Instance validation.