# JS Algorithm

## 01-Basic Algorithm

### 1.1 Accumulator
> initialize 0 to a variable.
> to find the cumulative sum of values.
> find the pattern of each item with the loop variable (i).

```js
var sum = 0; // Accumulator

for (var i = 0; i < n; i++) {
    sum += item;
}
```

### 1.2 Multiplier
> initialize 1 to a variable.

```js
var product = 1; // Multiplier

for (var i = 0; i < n; i++) {
    product *= item; // you need to find pattern for this item.
}
```

### 1.3 Brute Force Method

> aka exhaustive search.
> each possible value within a given range is taken out and checked against the given conditions.
> - if a value met the conditions, it is considered a valid solution.

> **Tip:**
> - Think of what you can do to reduce the range of exhaustive search.
> - Find the relationship between the outer loop and inner loop.

#### 1.3.1 Application


##### 1.3.1.1 Narcissistic Number / Armstrong Number / Pluperfect Digital Invariant (PPDI)

> **Requirements:**
> - n must be 3 digits
> - hundreds ** 3 + tens ** 3 + ones ** 3 = n

> **Methods**
> 1. Mathematical Method
> 2. String Method.

> **Extra:**
> String.prototype.charAt()
> - returns a character whose value < 65535.
> - higher code points are represented in a pair of 16-bit surrogate.
> - to retrieve value > 65535 we need charAt(i) + charAt(i + 1)
> - for most use case, charAt is fine but you need to know its limitation.
```js
var a = "我爱你";
console.log(a.charAt(0));
console.log(a.charAt(1));
console.log(a.charAt(2));
var emoji = "🌍";
console.log(emoji.charAt(0) + emoji.charAt(1));
// Safer method
console.log(String.fromCodePoint(emoji.codePointAt(0)));

```


##### 1.3.1.2 Prime Number

> **Requirements:**
> - The first prime number starts with 2.
> - divisible by 1 and itself.

##### 1.3.1.3 Chicken & Rabbit

> given heads.
> given legs.
> find the mathematical representation:
>  let a => chicken
>  let b => rabbits
> a + b = heads
> 2a + 4b = legs

> Tip:
> - find the relationship of the number of chicken and rabbit.
> - b = heads - a
> - iterate from 0 to heads.
> - check `2a + 4b = legs`.
> - return a & b if the condition is met.


## 02-Bubble Sort

## 03-Complexity & Recursion