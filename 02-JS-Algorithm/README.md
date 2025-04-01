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

- O(n^2) time complexity

> idea: 
> - Each turn, compare every two adjacent elements.
> - Swapping the order when the right element appears to be greater than the left one.
> - Otherwise, the position remains unchanged.
> - At the end of each turn, move the largest number from the unordered area to the end position.

> E.g., [1, 5, 3, 2, 6]

| Index | Turn | Comparison Count | Ordered Area Count |
| ----- | ---- | ---------------- | ------------------ |
| 0     | 1st  | 4                | 1                  |
| 1     | 2nd  | 3                | 2                  |
| 2     | 3rd  | 2                | 3                  |
| 3     | 4th  | 1                | 4                  |


> arr.length = 5
> totalTurn: arr.length - 1
> - condition: i = 0; i < arr.length - 1
> comparison count: arr.length - currentIndex - 1
> - condition: j = 0; j < arr.length - i - 1

```js
var arr = [22, 1, 5, 3, 2, 6, 77, 11, 3, 12, 50];

var len = arr.length;
// Control turns.
for (var i = 0; i < len - 1; i++) {
  // Control the comparison count.
  for (var j = 0; j < len - i; j++) {
    // When left element > right element, swapping happens.
    if (arr[j] > arr[j + 1]) {
      // Swapping logic.
      var temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;

      // XOR Swapping logic.
      // arr[j] = arr[j] ^ arr[j + 1];
      // arr[j + 1] = arr[j] ^ arr[j + 1];
      // arr[j] = arr[j] ^ arr[j + 1];
    }
  }
}

```

### 2.1 Bubble Sort V2

- use assumption method.

> Assume the array is sorted (isSorted = true).
> If swapping occurs, the array is not fully sorted (isSorted = false).
> Break out the loop if there's no swaps happen in a full pass (meaning: the comparison logic is not entered).
> remember the isSorted is reset.

### 2.2 Bubble Sort V3

> build on top of V2.
> find the index of the element during last exchange in every turn. (index = j)
> sortedBorder = index (where index is the index of element during last exchange)
> in next turn, the inner loop (represents the comparison counts) will run up to index before sortedBorder. (j < sortedBorder)

## 03-Complexity & Recursion