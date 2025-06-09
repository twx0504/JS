## IEEE 754 Double-Precision Format in JavaScript

JavaScript uses the **IEEE 754 double-precision 64-bit binary format** to represent all numbers.

### Structure (64 bits total):
- **1 bit**: Sign  
- **11 bits**: Exponent (biased)  
- **52 bits**: Mantissa (fraction/significand)

---

### 🔹 1. Sign Bit (1 bit)
- **0** = Positive  
- **1** = Negative  
- Controls the sign of the number.

---

### 🔹 2. Exponent (11 bits)
- Stores the **scale** of the number.
- Uses a **bias of 1023**:  
  `actualExponent = storedExponent - 1023`
- Allows for both very large and very small values.

#### Special cases:
| Exponent Bits | Mantissa Bits | Meaning            |
| ------------- | ------------- | ------------------ |
| 0             | 0             | Zero               |
| 0             | ≠ 0           | Subnormal number   |
| 2047 (all 1s) | 0             | Infinity           |
| 2047          | ≠ 0           | NaN (Not a Number) |

---

### 🔹 3. Mantissa / Significand (52 bits)
- Represents the **fractional part** of the number.
- **Normalized numbers**:  
  `1.<mantissa>` is implied (implicit leading 1).
- **Subnormals**:  
  `0.<mantissa>` — no implicit 1.
- Provides **~53 bits of precision** (52 bits + 1 implicit bit).

---

### 🔸 How It All Works

#### Normalized numbers:

```js
// normalized numbers
// (-1)^sign * (1 + mantissa) * 2^(exponent - 1023)
```

```js
// subnormal numbers
// (-1)^sign * (0 + mantissa) * 2^(-1022)
```
---

### 📏 Precision
- About **15–16 decimal digits** of precision.
- Many **decimal fractions cannot be exactly represented** in binary (e.g. `0.1`).
- This leads to rounding errors:  
```js
0.1 + 0.2 === 0.3 // false
```


### `Number.prototype.toFixed Issue`

```js
// 1. Storage: Conversion from base 10 to base 2 results in recurring binary


console.log((0.2).toString(2));
// Output (truncated): '0.001100110011001100110011001100110011001100110011001101'

// Notice the recurring pattern '0011...' in binary, which can't be represented exactly in finite bits.
// The final digit is rounded up after truncation.

// Examples of rounded up and rounded down binary fractions:

console.log((0.1).toString(2));
// '0.0001100110011001100110011001100110011001100110011001101'
// Ends with '1' — means the binary fraction is rounded up.

console.log((0.3).toString(2));
// '0.010011001100110011001100110011001100110011001100110011'
// Ends with '0' — means the binary fraction is rounded down.

// This rounding direction influences the precision and accuracy of calculations later on.

// 2. Calculation: base 2 rounding causing imprecision

console.log(0.1 + 0.2);
// Output: 0.30000000000000004
// Both 0.1 and 0.2 are stored as approximated binary fractions rounded up,
// causing their sum to be slightly larger than 0.3.

console.log(0.2 + 0.3);
// Output: 0.5
// Here, rounding errors cancel out, so result is exact.

console.log(0.3 - 0.2);
// Output: 0.09999999999999998
// 0.3 is slightly rounded down, 0.2 slightly rounded up, result is slightly less than 0.1.

console.log(0.2 - 0.3);
// Output: -0.09999999999999998
// Similarly, result is slightly larger than -0.1.

// 3. Display: JavaScript rounds output based on approximation

console.log(0.1 + 0.2 === 0.3);
// Output: false
// Because actual sum is 0.30000000000000004, not exactly 0.3.

console.log(0.1 + 0.2);
// Output: 0.30000000000000004 (shows the full imprecise value)

console.log((0.1 + 0.2).toFixed(2));
// Output: '0.30' (rounded for display)

// The displayed value may be rounded, but the underlying value is still imprecise.

```