# BigInt

> - primitive type.
> - only for integer.
> - problem it solved: express number greater than `Number.Max_Safe_Integer` (2^53 - 1).
> - do not have limit on the number of digit of an integer.
> - work with arithmetic operations except unary plus and `>>>` operator.
> - cannot mix arithmetic operation between bigint and number type.
> - bigint is loosely equal (`==`) to number, but not strictly equal (`===`) to number.

## Creating BigInt

```js
2n;

BigInt(2)

BigInt("3")

// Expressing different base

let n1 = 0b001n; // base 2
let n2 = 0o12n; // base 8
let n3 = 0xan; // base 16
```

## Notes

1. `BigInt(true)` = 1n
2. `BigInt(false)` = 0n (Only 0n is falsy)
3. `1n + "a string"` = `"1a string"`
4. division `\` truncates the fractional part towards 0, regardless of positive or negative.
5. bigint cannot be used with methods of Math.