# 04-Expressions & Operators

## 4.1 What is Expressions?

> operators: symbols that uses to assign, compare, or doing some arithmetic calculation, etc.
> expression = the combination of one or more operands (number / variables) and operators.
> return value = the final output of the expression.

```js
1 + 5 

// 1 & 5 => operands
// + => operator
// 1 + 5 => expression

```

**Classification of expressions:**

> each type of expression has their corresponding operators.

1. arithmetic expression: `+,-,*,/`
2. assignment expression: `=, +=, -=, *=, /=` etc.
3. relational / comparison expression: `>, <, >=` etc.
4. logical expression: `!, &&, ||`
5. composite expression: the combination of the previous four types.

## 4.2 Arithmetic Expressions

### 4.2.1 Arithmetic Operators
| Arithmetic Operators | Description    |
| -------------------- | -------------- |
| +                    | Addition       |
| -                    | Subtraction    |
| *                    | Multiplication |
| /                    | Division       |
| %                    | Remainder      |

> pattern of remainder expression:
> `a % b` where `b > a`, the result will be `a`.
> `3 % 4` -> 3
> `5 % 20` -> 5

> Note: 
> - `a % b` is called "a is divided by b".
> - `Dividend ÷ Divisor = Quotient (with Remainder)`


### 4.2.2 Operator Precedence

> `()` > `*/%` > `+-`
> increase the precedence of `+-` by `()`

### 4.2.3 `+` -> Addition & String Concatenation

> `+` in js involves in two operations: addition & string concatenation.
> when both sides of `+` are values other than string, it performs addition. Otherwise, if one or both sides are string, it will concatenate.


### 4.2.4 Implicit Type Conversion

> - Js automatically converts type for us, which is known as implicit type conversion by calling some corresponding function for the conversion (e.g., `Number()`).
> - when any operands involved in an arithmetic operation are not number type, Js will automatically converts the operand to number type before arithmetic operation.

> important notes:
> - any value + NaN -> NaN, except string due to string concatenation.
> - if either side of the `+` operator is a **string** then it will be string concatenation instead!

### 4.2.5 Explicit Type Conversion

> - explicitly / manually call the function like `Number()`, `parseInt`, `parseFloat` to convert a value to a specific type (in this case, number type).

### 4.2.6 Special Use Case of Unary Operator `+` & `-`

> similar to the use of Number() to convert a value into number type.
> it can also be used to convert string of different base number to number (in base 10 form) as well.
> e.g., `+'0b10' -> 2`
> remember in some cases when using `-` to convert a value to number, the value will have a negative sign (`-`).
> e.g., -true, -false, -null => -1, -0, -0 separately.

### 4.2.7 Floating Point Precision Problem

> Js floating point number is not precise during calculation.
> note: the floating point provided by a persono is correct, but the problem **occurs when you use it in calculation**.

```js
/* Precision Problem */
0.1 * 0.2; // 0.020000000000000004
0.07 * 100; // 7.000000000000001
0.1 + 0.2; // 0.30000000000000004

/* Problem in comparison */
var a = 0.1 + 0.3;
console.log(a == 0.3); // false

```

**Why?**

> In JavaScript, numbers are implemented in double-precision 64-bit binary format IEEE 754.
> This is the cause of some floating point number losing some precision.


**Solution to deal with floating-point precision problem:**

> - do not use floating point to do calculation!
> - use `toFixed()` to keep a specific number of decimal places after calculation if needed.
> - return value of `toFixed()` is **string**
> - round up at 5.

## 4.3 Assignment Expressions

> used to assign values to a variable.

| Operators          | Description                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| =                  | assignment                                                                                                                                       |
| +=, -=, *=, /=, %= | compound assignment operator (addition assignment, subtraction assignment, multiplication assignment, division assignment, remainder assignment) |
| ++                 | increment                                                                                                                                        |
| --                 | decrement                                                                                                                                        |

### 4.3.1 Assignment Operator `=`

> assign value on the right-hand side of the `=` to a variable.
> this value is also the return value of the assignment operation.
> we can do continuous assignment based on this property

```js
var a = 2; // 2
var a = 2 + 4 / 2; // 4
var c;

/* Assignment produces a return value. */
console.log((c = 1 * 5)); // 5

/* Continuous Assignment */
var x, y, z;
x = y = z = 14 + 2;
console.log(x, y, z); // 16 16 16
```
### 4.3.2 Compound Assignment Operators

> calculate on the basis of the original value.
> this is concise to write, it will not improve performance.

```js
var a = 1;
a += 5; // a = a + 5;
console.log(a); // 6
var b = 2;
b -= 1; // b = b - 1;
console.log(b); // 5
var c = 4;
c %= 3; // c = c % 3;
console.log(c); // 1
```

### 4.3.3 Increment `++` / Decrement `--`

> `++` increase 1 on its operand.
> `--` decrease 1 on its operand.

```js
var i = 1;
i++; // equivalent to i = i + 1;
console.log(i); // 2
var j = 2;
j--; // equivalent to j = j - 1;
console.log(j); // 1
```

> the operand must be a variable.

```js
console.log(++5); // Uncaught SyntaxError: Invalid left-hand side expression in prefix operation
console.log(--5); // Uncaught SyntaxError: Invalid left-hand side expression in prefix operation

/* There's no variable there to receive the value. */

```

**Difference between `++a` & `a++`**

> Pre-increment `++a` means self increment before assignment.
> Post-increment `a++` means assignment before self increment.

```js
/* Difference between ++a & a++ */
var a = 1;
var b = a++; // a = a + 1 (a++ assign value firbefore increment)
console.log(a, b); // 1 2

var a = 1;
var b = ++a; // a = a + 1 (increment first, before assigning value)
console.log(a, b); // 2 2

```
**Difference between `--a` & `a--`**

> Pre-decrement `--a` means self-decrement before assignment.
> Post-decrement `a--` means assignment before self-decrement.


**Important Note:**
> - write increment on a separate line, pre / post-increment makes no difference.
```js

var a = 10;
++a; 
console.log(a); // 11

var a = 10;
a++;
console.log(a); // 11

```
> - write increment on the same line as the output, pre / post increment matters.
```js
var a = 10;
console.log(++a); // 11 (increase first, then print)


var a = 10;
console.log(a++); // 10 (print first, then increase)
```

## 4.4 Relational / Comparison Expressions

| Operator | Description                                        |
| -------- | -------------------------------------------------- |
| `>`      | greater than                                       |
| `<`      | less than                                          |
| `>=`     | greater than or equal                              |
| `<=`     | less than or equal                                 |
| `==`     | equal                                              |
| `!=`     | not equal                                          |
| `===`    | strict equal (compare value & type)                |
| `!==`    | strict not equal (result is the opposite of `===`) |

> their return value is boolean type (`true` or `false`).

### 4.4.1 `>`, `<`, `>=`, `<=`

> - compare the relative size of two values.
> - involves implicit type conversion.

#### 4.4.1.1 When either side are string, boolean, null, undefined

> implicitly invokes Number() to convert the value into number type before comparison.

#### 4.4.1.2 When both side are strings 

> - do not involve implicit type conversion.
> - compare Unicode character by character until it finds the different. If the first character is identical, it will continue with the next pair of characters.
> check unicode of a character at https://unicodelookup.com/.
> A~Z 65 ~ 90
> a~z 97 ~ 122
> 0~9 48 ~ 57

```js
'abc' < 'b'; // true ('a' < `b`)

'11' < '5'; // true ('1' < '5')

'abc' < 'acd'; // true ('b' < 'c')

```
### 4.4.2 No Support of Chained Comparison

> In JavaScript, the evaluation starts from left to right, one comparison at a time.

```js
/*
  -> from left to right
  -> one comparison at a time
  -> converts to number type if necessary when both side of the comparison operator are not string. 
  -> 1 < 3 < 2 => true < 2 => 1 < 2 => true
*/

console.log(1 < 3 < 2); //  true -> but mathematically speaking, it is wrong.

/* 
  Math:
    -> 3 > 1 => true
    -> 3 < 2 => false
    so, 1 < 3 < 2 is false.

  we should use the logical operator we will learn later to implement this chained comparison.
*/

console.log(3 > 1 && 3 < 2); // false - this is correct.

```
### 4.4.2 `==`, `!=`

> - `==`: check if two values are equal.
> - `!=`:check if two values are not equal.
> - these two operators do not take into account the data type.
> - involves implicit type conversion, internally invokes Number().
> - Special case: null can only loosely equal to `itself` or `undefined`, otherwise, it is false.

### 4.4.3 `===` , `!==`

> - `===`: strict equality
> - `!==`: strict inequality 
> - take into both value and data type into consideration.
> - do not involve type conversion.


### 4.4.4 Special Case Summary

```js
undefined == null; // true
undefined === null; // false

null == ""; // false

/* NaN is not equal to itself! */
NaN == NaN; // false
NaN === NaN; // false
NaN != NaN; // true
NaN !== NaN; // true
```

### 4.4.5 Difference Between `=`, `==`, `===`

> - `=`: assign value
> - `==`: compare value.
> - `===`: compare value and type.

## 4.5 Logical Expressions

| Operators | Description    |
| --------- | -------------- |
| `!`       | NOT (Negation) |
| `&&`      | AND            |
| `\|\|`    | OR             |

### 4.5.1 NOT `!`
> - used to negate a value (true -> false, false -> true)
> - it is a unary operator, it can only has one operand.
> - operand can be any type.
> - involve implicit type conversion, internally invokes Boolean() to get the boolean value before negation.
> return value must be boolean type.

**Double Negation**
> convert a value to boolean.

```js
!!3; // true (!false => true)
!!undefined; // false (!true => false)
```

**Conversion to Boolean type:**
> 1. call Boolean()
> 2. use double negation (`!!`)

### 4.5.2 AND `&&`

> - check the values on both sides of `&&` and returns the first falsy value, or if none, the last truthy value.
> - it is a short-circuit operator - it stops evaluating once it finds a falsy value.

**Short Circuit Operation**

> - if the first operand is falsy, it is returned immediately without checking the second operand.
> - if the first operand is truthy, the second operand is evaluated and returned as is.
> operands can be expressions, values, functions, objects, any data types.

**Note:**
> If a value can be converted to true, the value is so-called truthy. If a value can be converted to false, the value is so-called falsy.

**Memorization**: 
> `A && B`: returns the first falsy value., or the last truthy value if both are truthy.
> - If A is falsy, returns A.
> - If A is truthy, return B as is (whether B is truthy or falsy)..

#### 4.5.2.1 Check the range of a number

```js
var a = 10;
/* 5 < a < 12 */
console.log(a > 5 && a < 12);
/* 5 < a < 8 */
console.log(a > 5 && a < 8);

var b;
b = a > 5 && a < 12;
console.log(b);
b = a > 5 && a + 2;
console.log(b);

```

#### 4.5.2.2 Check if a value is NaN

```js
// Method 1: check if it is a value that is number type and not a number.
// Note: isNaN() not only returns true for NaN, but other data type that is not a number as well.
var x = NaN;
var _isNaN = typeof x === "number" && isNaN(x);

// Method 2: NaN is not equal to itself!
var _isNaN2 = x !== x;
console.log(_isNaN); // true
console.log(_isNaN2); // true

```

### 4.5.3 OR `||`

> - checks the values on both sides of `||` and returns the first truthy value, or if none, return the last falsy value.
> - it is a short-circuit operator - it follows short-circuit evaluation in logical OR operations.

**Short Circuit Operation**
> - if the first operand is truthy, it is returned immediately without checking the second operand.
> - if the first operand is falsy, the second operand is evaluated and returned.
> operands can be expression, value, function, object, any data types.

**Memorization**: 
> `A || B`: returns the first truthy value.
> - If A is truthy, returns A.
> - If A is falsy, return B as is (whether B is truthy or falsy).

### 4.5.4 Logical Operator Precedence 

> `!` > `&&` > `||`
> when meet `&&` or `||` we must consider short-circuiting, by evaluating the operand on the left hand side of the `&&` and `||`.

```js
/* 
1 && false || !"" && 5
Step 1 NOT: 1 && false || true && 5
Step 2 AND: false || 5
Step 3 OR: 5
*/
1 && false || !"" && 5; // (1 && false) || (true && 5) => false || 5 => 5

// It is great to use parentheses for readability and maintainability
(1 && false) || (!"" && 5);
```
## 4.6 Composite Expressions

precedence from top to bottom:
- parentheses ()
- unary `++` `--`
- NOT `!`
- Arithmetic operators
- Comparison Operators
- Logical Operators `&&` `||`
- Assignment Operators

> - same precedence, evaluate from left to right.
> - use parentheses to raise the precedence & readability.

```js
var a = 10;
// a = 11 => a = 12
// 10 && 11 < 11 => false || a ++ => 11
var b = (a++ && a < 11) || a ++;
// 13 && 12 + 2 => 14
var c = a + 1 && a + 2; 
console.log(b, c, a); // 11 14 12
```
### 4.6.1 Precedence of All Operators

> The operators at the top has more priority over those beneath them.

- `()`
- `++`, `--`
- `!`, `~`, `+`, `-`, `typeof`, `void`, `delete` (unary operators: requires only one operands)
- `%`, `*`, `/`
- `+`, `-` (binary operators: requires two operands)
- `<<`, `>>`, `>>>`
- `<`, `<=`, `>`, `>=`
- `&`
- `^`
- `|`
- `&&`
- `||`
- `?:`
- `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `<<=`, `>>=`, `>>>=`, `&=`
- `,`

> Be careful of the short circuit of `&&` / `||`.
> Also, `++a`, `a++`, `--a`, `a--`.

### 4.6.2 Ternary Operator

> requires three operands
> more like a concise version of `if ... else` statement.
> have return value.

```js
conditional expression ? expression 1 : expression2;

```
1. evaluate conditional expression.
2. if true, execute expression 1 and return the final output.
3. if false, execute expression 2 and return the final output.

```js

2 > 1 ? 1 + 1 : 2 + 3;

```

> Important:
> - Sometimes, we do not need to use a variable to receive the return value.
> - we care about what to do when a condition met.

```js
var a = 2;
a > 1 ? alert(a + " is greater than 1."): alert(a," is not greater than 1.");

/* Although alert got a return value of undefined, it is not useful here. */
```

**Use Case: Padding 0**

```js
// 2020 5 5 (no padding zeroes)
// 2020 05 05 (what we want)

```

## 4.7 Bitwise Operators

> Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
> Bitwise operators can only work with 32-bits integer!
> - JavaScript stores numbers as 32-bit signed integers internally for most bitwise operations.


### 4.7.1 Conversion of +ve Base 10 to Binary

> How do you determine the place values (hundreds, tens, ones) of a number (e.g., 153)?
> - divide the number by 10.

```js
// dividend = quotient * divisor + remainder 
// dividend / divisor = quotient when remainder = 0;

// 153 / 10 = 15, remainder 3
// 15 / 10 = 1, remainder 5
// 1 / 10 = 0, remainder 1

// Reading the remainders from bottom to top, each represents hundreds, tens, ones place of 153.
```

**Conversion of Base 10 to Binary:**
> - divide the number by 2.

```js
/* 1. What is the binary form of 5？ */

// 5 / 2 = 2， remainder = 1
// 2 / 2 = 1, remainder = 0
// 1 / 2 = 0, remainder = 1 

// Reading the remainders from bottom to top, which is 101.


/* 2. What is the binary form of 10? */

// 10 / 2 = 5, remainder = 0
// 5 / 2 = 2, remainder = 1
// 2 / 2 = 1, remainder = 0
// 1 / 2 = 0, remainder = 1

// So, the binary form of 10 is 1010.
```

> For other bases, it is similar.

### 4.7.2 Conversion of Binary to Base 10

> if a specific bit in a binary number is 0, then that bit contributes 0.
> if it is 1, its value will be determined by the place value (power of 2).

```js
// 5 in 32-bit binary representation:
// 5 = 00000000 00000000 00000000 00000101

// Counting from the right (starting at the least significant bit):
// b0: first bit (2^0)
// b1: second bit (2^1)
// b2: third bit (2^2)

// Formula:
// Decimal = b2 * 2^2 + b1 * 2^1 + b0 * 2^0
// Calculation: 1 * 2^2 + 0 * 2^1 + 1 * 2^0 = 4 + 0 + 1 = 5

/* 1. Convert 1010 (binary) to decimal */
// 1010 = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 0 * 2^0
//      = 8 + 0 + 2 + 0
//      = 10

/* 2. Convert 11101 (binary) to decimal */
// 11101 = 1 * 2^4 + 1 * 2^3 + 1 * 2^2 + 0 * 2^1 + 1 * 2^0
//       = 16 + 8 + 4 + 0 + 1
//       = 29
```

### 4.7.3 Conversion of Negative Base 10 to Binary

> **Importance:**
> only works with bitwise operations and right shift (>>) in JavaScript.

> Negative number is stored in Two's complement representation.
> Steps:
> 1. Convert the absolute value of the number to binary.
> 2. Invert each bit (0 → 1 &  1 → 0) to get the one's complement.
> 3. The inverted binary + 1 to get the two's complement.

```js
// Step 1: Convert absolute value (5) to binary
// 5 in binary (32-bit): 
// 00000000 00000000 00000000 00000101

// Step 2: Take the One’s Complement (invert all bits)
// 11111111 11111111 11111111 11111010 

// Step 3: Add 1 to get the Two’s Complement
// 11111111 11111111 11111111 11111011 (This is how -5 is stored)


/* Just for validation only: */
/* Is ob11111111111111111111111111111011 converted to -5? */

var str = ob11111111111111111111111111111011; // Js binary prefixes with 0b.
console.log(str >> 0); // -5 - yes it is!
```
### 4.7.4 How to Differentiate Positive and Negative Binary Numbers?

> bitwise operators (`~` `&` `|` `<<` `>>`) always treat number as signed 32-bit integers.
> > - the only exception is `>>>` (unsigned right shift) 
> > - `>>>` forces unsigned interpretation (treating the number as a 32-bit unsigned integer).
> 
> **Signed Bit (Most Significant bit, MSB)**: 
> - the 32nd bit , representing the sign of a number.
> - 0 → +ve
> - 1 → -ve
> +ve number: stored directly in binary.
> -ve number: stored in two's complement representation.

```js
/* Only works if you are using signed right shift (>>) */
// two's complement  : 0b11111111111111111111111111111101
// first's complement: 0b11111111111111111111111111111100
// binary            : 0b00000000000000000000000000000011
// -3

/* Using unsigned right shift (>>>) */
// 4294967293

var num1 = 0b11111111111111111111111111111101; // Negative -3
/* Convert binary to decimal: */
console.log(num1 >> 0);  // -3 (interpretation as a signed 32-bit integer)
console.log(num1 >>> 0); // 4294967293 (Unsigned interpretation, treated as positive)

var num2 = 0b01111111111111111111111111111101; // Positive
var num3 = 0b10000000000000000000000000000001; // Negative
var num4 = 0b00000000000000000000000000011001; // Positive

/* If getting a binary in which the 32nd bit is 1, convert it to binary by subtracting 1 from the binary and then inverting all bits. */

```
### 4.7.5 The Basic of Bitwise Operators

- ECMAScript stores all numbers in IEEE 754 64-bit floating-point format.
- Bitwise operation works with 32-bits signed number.
  - converts to 32 bit before computation.
  - converts back to 64 bits at the end.
- extremely fast.

| Operator | Description          |
| -------- | -------------------- |
| `&`      | Bitwise AND          |
| `|`      | Bitwise OR           |
| `~`      | Bitwise NOT          |
| `^`      | Bitwise XOR          |
| `>>`     | Right Shift          |
| `>>>`    | Unsigned Right Shift |
| `<<`     | Left Shift           |

> Before performing bitwise operation, the string representation of number will be converted to number type first.

#### 4.7.5.1 Bitwise AND Operator (&)

> `A & B`
> - convert operand A and B to 32 bits binary.
> - compare bit by bit.
> 
> when both bits are 1, the result is 1.
> Otherwise, the result is 0.

**Truth Table**
| First Bit | Second Bit | Result |
| --------- | ---------- | ------ |
| 1         | 1          | 1      |
| 1         | 0          | 0      |
| 0         | 1          | 0      |
| 0         | 0          | 0      |

```js
var result = 5 & 3;

// Convert to 32 bits and compare.

// 5 => 00000000 00000000 00000000 00000101
// 3 => 00000000 00000000 00000000 00000011 &
//      -------------------------------------
//   => 00000000 00000000 00000000 00000001
//   => 1
console.log(result); // 1

```

**Check Odd & Even (Parity)**

- if A & 1 == 1, A is odd.
- if A & 1 == 0, A is even.

```js
/* 
  - The other 31 bits are going to compare themselves with zero and get zero.
  - The final output is determined by the first bit.
*/

// 5 => 00000000 00000000 00000000 00000101
// 1 => 00000000 00000000 00000000 00000001 &
//      -------------------------------------
//   => 00000000 00000000 00000000 00000001
//   => 1 (odd)

5 & 1 == 1; // odd

// 4 => 00000000 00000000 00000000 00000100
// 1 => 00000000 00000000 00000000 00000001 &
//      -------------------------------------
//   => 00000000 00000000 00000000 00000000
//   => 0 (even)

4 & 1 == 0; // even

```

> **Logic Behind:**
> ... + b3 * 2^3 + b2 * 2^2 + b1 * 2^1 + b0 * <i style="color: red; font-weight: bold;">2^0</i>
> - It is the first bit that determine whether a number is odd or even.
> - The other bits are already even as they are the multiple of two.
> - **Conclusion**: if the first bit is `0`, it is `even`. If it is `1`, it is `odd`.

#### 4.7.5.2 Bitwise OR Operator (|)

> `A | B`
> - when both bits are 0 gets 0. Otherwise gets 1.

| First Bit | Second Bit | Result |
| --------- | ---------- | ------ |
| 1         | 1          | 1      |
| 1         | 0          | 1      |
| 0         | 1          | 1      |
| 0         | 0          | 0      |

```js
// Convert to 32 bits and compare.

// 5 => 00000000 00000000 00000000 00000101
// 3 => 00000000 00000000 00000000 00000011 |
//      -------------------------------------
//   => 00000000 00000000 00000000 00000111
//   => 7
var result = 5 | 3；// 7
```

**Get integer part of a floating point number:**

> number | 0 = number (int)
> Any number | 0 will always get the integer part of the number back.

```js
// Note: any number | 0 will get back the integer part of number.
// 5 => 00000000 00000000 00000000 00000101
// 0 => 00000000 00000000 00000000 00000000 &
//      -------------------------------------
//   => 00000000 00000000 00000000 00000101
//   => 5
console.log(num | 0); // 5
console.timeEnd("2");

var num2 = -5.457;
console.log(num2 | 0); // -5

```

**Combine bit patterns**
- combine rgb color before converting to hex.
- combine different permissions flags.
- etc.
```js
// r << 16 00000000 00000010 00000000 00000000 
// g << 8  00000000 00000000 00100001 00000000 
// b       00000000 00000000 00000000 00110111  | (Bitwise OR)
//         -----------------------------------
//         00000000 00000010 00100001 00110111

```

#### 4.7.5.3 Bitwise NOT Operator (~)

> `~A`
> - a unary operator, only have one operand.
> - invert bit (1 -> 0, 0 -> 1)
> - final output: inverted number (+ve / -ve) - 1


| Bit | Result |
| --- | ------ |
| 1   | 0      |
| 0   | 1      |

```js
var num1 = 5;

// 5 => 00000000 00000000 00000000 00000101 ~
//      11111111 11111111 11111111 11111010 (You can a two's complement!)
//      -------------------------------------
//      How can you convert two's complement back to decimal?
//   => Step1: 11111111 11111111 11111111 11111010 (subtract 1, remember the MSB is 1, it is negative.)
//   => Step2: 11111111 11111111 11111111 11111001 (invert bit)
//   =>        00000000 00000000 00000000 00000110
//   => 6
//   => -6 (Because the the most significant bit of the two's complement is 1!)
console.log(~num1); // -6

```

**Get integer (Discard Decimal):**
`~~x = ~(-x-1) = -(-x-1)-1 = x + 1 - 1 = x`

```js
var num1 = 5.432;
console.log(~~num1); // 5

var num2 = -5.432;
console.log(~~num2); // -5

```

**Negate a number**
`~x + 1`

```js
var a = 5;
console.log(~a + 1);

```


#### 4.7.5.4 Bitwise XOR Operator (^)

> `A ^ B`

> when both bits are different, gets 1. Otherwise, 0.


| First Bit | Second Bit | Result |
| --------- | ---------- | ------ |
| 1         | 1          | 0      |
| 1         | 0          | 1      |
| 0         | 1          | 1      |
| 0         | 0          | 0      |

```js

// Convert to 32 bits and compare.

// 5 => 00000000 00000000 00000000 00000101
// 3 => 00000000 00000000 00000000 00000011 ^
//      -------------------------------------
//   => 00000000 00000000 00000000 00000110
//   => 6
var result = 5 ^ 3; // 6

```
**1. Identity Property**
- `a ^ 0 = a` (int)

```js
var num1 = 5;
console.log(num1 ^ 0); // 5
var num2 = 6.3;
console.log(num2 ^ 0); // 6

```

**2. Self-Inverse Property**
- `a ^ a = 0`
- `a ^ a ^ a = a`: XOR (^) itself twice or even number of times get itself.

```js
5 ^ 5 ^ 5; // 5 - two times ^
5 ^ 5 ^ 5 ^ 5; // 0 - three times ^
```

**3. Commutative Property: Exchange The Values of Two Variables:**
- `a ^ b = b ^ a`
- only work for **number**.
- remember decimal part of a floating number will be truncated.

```js
/* 3. Commutative Property - Exchange integers only! Decimal part is truncating. */
var a = 5;
var b = 10;

a ^= b;
b ^= a;
a ^= b;
      
/* Deduce:
      
  1. a ^= b => a = a ^ b;
     a now stores the result of a ^ b.

  2. b ^= a => b = b ^ a; => b ^ (a ^ b) => (b ^ b) ^ a => 0 ^ a => b = a
    through commutative property and self-inverse property, b gets a.
  
  3. a ^= b => a = a ^ b; => (a ^ b) ^ a => (a ^ a) ^ b = 0 ^ b => a = b
    through commutative property and self-inverse property, a gets b.     
*/
console.log(a, b); // 10 5

```

#### 4.7.5.5 Left Shift (<<)

> `<<`
> shift all the bits to the left.
> the bits that exceeds 32nd bit will be truncated.
> the bits on the right will be padding with zeroes.

```js
// 5:       |00000000 00000000 00000000 00000101
//     00000|00000000 00000000 00000000 101xxxxx      (Truncate the bits exceeds the 32nd bit)
//          |00000000 00000000 00000000 10100000 (Padding with zeroes)
//  => 1 * 2^7 + 1 * 2^5 = 160
console.log(5 << 5); // 160

// -5:       |00000000 00000000 00000000 00000101
//           |11111111 11111111 11111111 11111010
//           |11111111 11111111 11111111 11111011
//      11111|11111111 11111111 11111111 011xxxxx (Truncate the bits exceeds the 32nd bit)
//           |11111111 11111111 11111111 01100000 (Padding x with zeroes)
//           ------------------------------------ (You get the two's complement, and the MSB is 1 which is negative.)
//           |11111111 11111111 11111111 01011111 subtract 1
//           |00000000 00000000 00000000 10100000 invert
//   => 1 * 2^7 + 1 * 2^5 = 160 
//   => -160
console.log(-5 << 5); // -160

```
> After left shift, if the leftmost bit is 1, it is negative. If 0, it is positive.

```js
console.log(-1073741827 << 1); // 2147483642
```

#### 4.7.5.6 Right Shift (>>)

> `>>`
> Signed right shift.
> shift all the bits to the right, keeping the sign (+ve / -ve).
> The empty bits on the left of the sign bit is padded with the value of the signed bit.

```js
// 160: |00000000 00000000 00000000 10100000|
//      |xxxxx000 00000000 00000000 00000101|00000 (Truncate)
//      |00000000 00000000 00000000 00000101|      (Padding x with the value of signed bit, which is 0 )
//  => 1 * 2^2 + 1 * 2^0 = 5
console.log(160 >> 5); // 5

// -5 : |00000000 00000000 00000000 00000101|
//    : |11111111 11111111 11111111 11111010| (Invert)
//    : |11111111 11111111 11111111 11111011| (Add 1)
//    : |xxxxx111 11111111 11111111 11111111|11011 (Truncate) 
//    : |11111111 11111111 11111111 11111111|      (Padding x with the value of signed bit which is 1) 
//      -------------------------------------
//    (Convert Negative Binary to Base 10)
//    : |11111111 11111111 11111111 11111110| (Subtract 1)
//    : |00000000 00000000 00000000 00000001| (Invert)
//  => 1 * 2^0 = 1
//  => -1 (Due to the signed bit 1 which is negative.)
console.log(-5 >> 5); // -1
```


#### 4.7.5.7 Unsigned Right Shift (>>>)

> `>>>`
> shift all 32 bits to the right.
> the empty bit to the left of the 32nd bit will be padding with zero.
> - do not consider sign.
>
> +ve number: `>>>` same as `>>` as both of them padding left side with zeroes.
> -ve number: Difference! The 32nd bit is not a sign bit anymore!

```js
// 55:        |00000000 00000000 00000000 00110111|
//   :        |xxxxx000 00000000 00000000 00000001|10111 (Truncate)
//   :        |00000000 00000000 00000000 00000001|      (Padding 0)
//  1 * 2^0 = 1

console.log(55 >>> 5); // 1

/* Negative number becomes positive after unsigned right shift. */
// -55:        |00000000 00000000 00000000 00110111|
//             |11111111 11111111 11111111 11001000| (Invert)
//             |11111111 11111111 11111111 11001001| (Add 1)
//             |xxxxx111 11111111 11111111 11111110|01001 (Truncate)
//             |00000111 11111111 11111111 11111110|      (Padding 0)
//              -----------------------------------
//  => 134217726 (calculator)
console.log(-55 >>> 5); // 134217726 - it becomes positive number!

```
> Negative number becomes positive after the unsigned right shift.

## 4.8 Applications of Bitwise Operators

### 4.8.1 Random Function

> `Math.random()`
> - output >= 0 AND < 1

```js
// [0, 1)
Math.random();

// [0 - 5]
Math.floor(Math.random() * 6); 

// [7-16]
// 16 - 7 = 9 (The range of Math.random()) => 0 - 9
// 10 (to get 0 - 9 after Math.floor)
console.log(7 + Math.floor(Math.random() * 10));

// Customize your range: a + Math.floor(Math.random() * (b - a + 1))
var min = 2;
var max = 10;
var random = min + Math.floor(Math.random() * (max - min + 1));
console.log(random);

// Use of bitwise (| & >>) to get int
// [5-10]
console.log((Math.random() * 6) >> 0 + 5)

/* Use parseInt */
// [5-10]
console.log(parseInt(Math.random() * 6) + 5);
```

### 4.8.2 Generate Random Color

```js

/* RGB */
// Range of RGB 0 - 255
var min = 0;
var max = 255;

// Random number [0, 255]
var random = min + ((Math.random() * (max - min + 1)) >> 0);
var r = random;
var g = random;
var b = random;

// String concatenation to get rgb(r,g,b) string
console.log("rgb(" + r + "," + g + "," + b + ")");

/* HEX */
// [0, fffff]
var randomHex = "#" + Math.round(Math.random() * 0xffffff).toString(16).padStart(6, "0");

/* Take the first 6 decimal places of the Math.random result */
var randomHex = "#" + Math.random().toString(16).substring(2, 8);
```

### 4.8.3 RGB -> HEX Color

#### 4.8.3.1 Relationship between RGB & HEX

> Hexadecimal (Base 16)
> - 0 1 2 3 4 5 6 7 8 9 a b c d e f
> Convert base 16 to base 10: + ... + b2 * 16^2 + b1 * 16^1 + b0 * 16^0

```js
/* Relationship */
// rgb(r, g, b) --> #rrggbb
// base-10  --> base-16 (hexadecimal)
// r (0-255) --> rr 0-FF
// g (0-255) --> gg 0-FF
// b (0-255) --> bb 0-FF

/* Example: */
// rgb(50, 11, 20) --> #320b14
// r --> rr (50 --> 32)
// g --> gg (11 --> b)
// b --> bb (20 --> 14)

// rgb(0,0,255) --> #0000ff (#00f)

// rgb(7, 200, 150) --> #07C896
```

> Machine converts rgb to hex via decimal -> binary -> hex at the lowest level.

```js
//             R        G        B    
//           0-255    0-255    0-255         rgb(0, 3, 255)
// 00000000 00000000 00000011 11111111         binary
//            0-FF     0-FF     0-FF         #0003ff
```

```js
// rgb (rgb(2,33,55)) -> hex
// Binary:
// 00000000 00000000 00000000 00000010 2 << 16
// 00000000 00000000 00000000 00100001 33 << 8
// 00000000 00000000 00000000 00110111 55
//                  | left shift
//                  V
// 00000000 00000010 00000000 00000000 
// 00000000 00000000 00100001 00000000 
// 00000000 00000000 00000000 00110111  | (Bitwise OR)
// -----------------------------------
// 00000000 00000010 00100001 00110111 => 139575 hex

var rgb = `rgb(2,33,55)`;
var rgbArr = rgb.split(/[^\d]+/); /* REGEX */


var r = rgbArr[1]; // "2"
var g = rgbArr[2]; // "33"
var b = rgbArr[3]; // "55"

var color = (r << 16) | (g << 8) | b;
var _color = color.toString(16);
// If the length of _color is less than 6, padding zero in front.
_color = "#" + _color.padStart(6, "0");
console.log(_color); // #022105
```

### 4.8.4 HEX Color -> RGB

> use bitwise operator, it will automatically convert the hex number to 32 bit binary.

1. `>>` 16 gets red.
2. `>>` 8 & 0xff gets green
3. &0xff gets blue

> &0xff is used to make sure the bits beyond the first 8 bits are all zeroes.

```js
// hex (#02233b) -> rgb 
// Binary of #02233b:
// 00000000 00000010 00100011 00111011
//                  | Right Shift
//                  V
// r: 00000000 00000000 00000000 00000010  
// --------------------------------------
// g: 00000000 00000000 00000010 00100011 & 0xff
//    00000000 00000000 00000000 11111111
// ======================================
// => 00000000 00000000 00000000 00100011
// --------------------------------------
// b: 00000000 00000010 00100011 00111011 & 0xff
//    00000000 00000000 00000000 11111111
// ======================================
// => 00000000 00000000 00100000 00111011
//    -----------------------------------

// #02233b
var hex = "#02233b";
// replace returns a new string.
hex = hex.replace("#", "0x");
var r = hex >> 16;
// & 0xff is used to make sure the bit beyond 8bits are 0.
var g = (hex >> 8) & 0xff;
var b = hex & 0xff;
var rgb = "rgb(" + r + "," + g + "," + b + ")";
console.log(rgb);

```