# 03-Data Types & Type Conversion

## 3.1 Introduction of Data Types

### 3.1.1 Why Do We Categorize Data into Different Types?

- Each data type has its own properties and behaviors.
- We cannot use the same way to treat all data.
- We need to handle different data types in different ways.

```js
// How do Js knows 1 + 1 results in 2 and '1' + '1' results in '11'?
// How the data is handled based on data types.

var a = 1 + 1; // Addition
var b = '1' + '1'; // String concatenation
console.log(a, b); // 2, '11'

```

> Compiler / Interpreter understands the data types and knows how to handle them.

### 3.1.2 Data Types

- here refers to the type of literals.
- the variable type will be determined by the value assigned to it (JS is a Dynamic Type Language)

**Primitive Data Types**

- String
- Number
- Boolean
- Null
- Undefined
- Symbol (ES6)
- BigInt (ES6)

**Reference Data Types**

- Object

### 3.1.3 Variable Types

- variable types are determined by the types of values they stored.

```js
var num = 1; // num type is Number.

var str = "Hello"; // str type is String.

```

> JS is a **dynamic typed language**, in which variables are not associated with any specific types. 
> Do not need to declare the type of variables beforehand.
> During code execution, JS engine will determine the variable type based on the value assigned to the right of the equal `=` sign.
> Once finished execution, the variable type is confirmed.

> **Static typed language**: variables are associated with specific types. e.g., Java, C++, C#.


```js
/* Variable can be any types at any moment. */

var a = 1; // a is Number type.

a = "Hello"; // a is String type.

a = true; // a is Boolean type.

```

### 3.1.4 Typeof Operator

- `typeof` operator is used to determine the data type.
- check the type of variable or literal (value). 
- two forms: 
  - `typeof a`
  - `typeof(a)` -> use for expression like `2 + '2'`.
  - where a is a variable or literal.
- result is a `string`.
```js
/* Literal */
console.log(typeof 1); // `number`

/* Variable */
var a = 1;
console.log(typeof a); // `number`
console.log(typeof(a)); // `number`

/* Expression must use typeof with parentheses () */
console.log(typeof(2 + '2')); // `string`

/* Return value type of typeof operator */
console.log(typeof typeof a); // `string`

```

## 3.2 Five Basic Data Types

### 3.2.1 Number

- all numbers including integers and floating-point numbers (decimal number) are of the number type.
- we can ignore the 0 before decimal point for number < 1 (Not recommended).

#### 3.2.1.1 Numbers with Different Bases
> base converter https://www.rapidtables.com/convert/number/base-converter.html
- commom numeral bases:
  - binary (base 2)
    - starts with `0b`.
    - each digit can only be 0 or 1, carry to the next higher digit when reaching 2.
  - octal (base 8)
    - starts with `0` or `0o`
    - each digit can only be 0-7, carry to the next higher digit when reaching 8.
  - decimal (base 10)
  - hexadecimal (base 16)
    - starts with `0x`
    - each digit can be 0-9 with extra symbols A-F (a-f), carry to the next higher digit when reaching 16.
#### 3.2.1.2 Scientific Notation

- write very large / small numbers.
- e7 = 10^7
- e-7 = 10^-7

#### 3.2.1.3 Min Value & Max Value

- Due to the limitation of memory, JS can not represent all numbers.
- `Number.MIN_VALUE`: the smallest positive numeric value.
- `Number.MAX_VALUE`: the largest positive numeric value.

#### 3.2.1.4 Infinity

> What is the uppest limit / lowest limit for a number to reach Infinity / -Infinity?

- `Infinity`
- `-Infinity`


#### 3.2.1.5 NaN
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
- Not a Number (NaN)
- NaN is a Number type.
- when an operation that's supposed to return a number but couldn't.
  - e.g., 0 / 0, parseInt("Hello"), 'a' - 'b'
- arithmetic operation with NaN results in NaN, unless it is string concatenation.
- NaN is not equal to NaN.

**isNaN()**
- check if a value is not a valid number.
- return true if the value is not a number.
- it involves **type conversion** before evaluation.
  - e.g., a numeric string `'123'` will return false.
  - a non-numeric string `'Hello'` returns true, which is not a number.
    - the implicit type conversion causes the non-numeric values to be converted into NaN, which then results in true.

- it is not used to determine if a value is NaN.

**Number.isNaN() - ES6**
- check if a value is NaN.
- do not force convert argument to a number.
- non-numbers are always false.
- only return true if the value is NaN.

### 3.2.2 String

#### 3.2.2.1 String Literals

- value enclosed in English single (`''`) / double (`""`) quotation marks is called string.

- use single quotation inside double quotation marks or use double quotation inside single quotation marks is okay.


```js
/* This is recommended. */
console.log('Hello "Wei Xin"'); 

console.log("Hello 'Wei Xin'");

console.log("Hello \"Wei Xin\"");
```

#### 3.2.2.2 Escape Characters `\`

- tell Js this character has other meaning.
- example:
  - `\n`: new line
  - `\\`: backslash
  - `\'`: single quote
  - `\"`: double quote
  - `\t`: tab

> if you want to write special characters that have special meaning in JS in a string, you need to escape them.
> e.g., use "" inside "" you must escape the "" inside "".

#### 3.2.2.3 String Concatenation

- join two strings together with "+".
- string can join with any data type, you will get a string as the result.
- string can works with variables.
  - the quotation marks are matched based on proximity.

```js
var greeting = "Hello" + "World".

var name = "Wei Xin";
var fruit = "Apple";
/* String working with variables. */
/* The matching of quotation is based on proximity. */
var str = name + " likes to eat " + fruit + ".";

var emptyString = "";
```
#### 3.2.2.4 Empty String
empty string = `""` (recommended) or `''`.

```js
var emptyString = "";
```

**Usage**
- type conversion.

```js
var a = 1;
a = a + '';
console.log(typeof a); // string

```

- pre-define the variable to be a string type to avoid error.

```js
/* use of empty string */
var result = "";
for (var i = 0; i < 5; i++) { 
  result = result + parseInt(Math.random() * 10);
}
console.log(result);

/* without empty string */
var result2;
for (var i = 0; i < 5; i ++) {
  result2 += result2 + parseInt(Math.random() * 10);
}
console.log(result2);
```

#### 3.2.2.5 Length
returns the length of the string.

### 3.2.3 Boolean

> do not enclose boolean value in quotation marks!

- value: `true` or `false`.
- usage: logical reasoning. 

```js
console.log(true); // true
console.log(false); // false

/* Logical Reasoning */
console.log(3 > 2); // true
console.log(1 > 2); // false
```

### 3.2.4 Null

> typeof null returns "object" though it is itself a basic data type due to historical reasons.
> - In early Js implementations, different objects are represented in binary at a low level .
> - objects were identified by their first three bites which is `000`.
> - null was stored as all zeroes, accidentally matching the pattern for objects.
> - due to this unintended match, `typeof null` mistakenly returns `object`.
> https://medium.com/hacktive-devs/null-is-not-an-object-8faa6d8d0257

- value: `null`
- represents the absence of an object / the variable points to no object.
- usage:
  - initialize with null if the variable is used to store object in the future.
  - destroy object, array, event listener by setting it to null for garbage collection purpose.

```js
var obj = {
  name: "Wei Xin",
  age: 25,
}

// remove the reference to the object in heap memory.
// Note: the {} is still in heap memory, but the variable obj does not point to it anymore.
// Since no variables reference this object anymore, Js treats it as garbage and will be collected by GC and frees up the memory.

obj = null;

```
### 3.2.5 Undefined

- value: `undefined`
- the default value when declaring an variable without assigning value.
- happens when:
  - variable declared but not assigned a value.
  - assigning value is not successful.

## 3.3 Type Conversion

- Javascript is a **weakly typed language** which means it allows implicit type conversion.

- three types of type conversion:
  - other types to number.
  - other types to string.
  - other types to boolean.

### 3.3.1 Other Types to Number

#### 3.3.1.1 Number()

- convert a value to a number.
- return NaN if the value cannot be converted.
- case:
  - numbers -> base 10.
  - string
    - empty string -> 0
    - whitespace string -> 0
    - string with number -> base 10
    - string with leading or trailing whitespace -> base 10
    - string with non-number characters e.g., `"20 13"` or `"2020b"` -> NaN

  - `true` -> 1, `false` -> 0.
  - `null` -> 0
  - `[]` -> 0
  - `{}` -> NaN
  - `undefined` -> NaN

```js
Number("123"); // 123
Number(""); // 0


```

#### 3.3.1.2 parseInt()

- convert a string to an integer of specific base.

**Rules**

- starting from the first non-empty character, if the first non-empty character is not a number, `+` or `-`, returns NaN.
- empty string -> NaN too!
- it parses the string from left to right, and stops parsing when it reaches the end of string or meets a non-number character.
- if the string starts with prefix `0x`, the radix is assumed to be base 16.
- otherwise, the radix is base 10.
- note: `0b` or `0o` prefix is not recognized.

**use case:**
- DOM manipulation e.g., `200px` -> `200` removing px unit.
  
```js
parseInt("200px"); // 200
parseInt(""); // NaN
```

#### 3.3.1.3 parseFloat()

- the conversion rules are similar to parseInt.
- converts a string to a floating-point number.
- do not recognize other bases including hexadecimal.

#### 3.3.1.4 unary operator (+-*/)

- convert a value to number by unary operator

```js
typeof +"1"; // "number"
```

### 3.3.2 Other Types to String

- converts to exact string representation of the value.
- exception: scientific notation / different bases are converted to base 10.
- note: `null` & `undefined` do not have toString method.

#### 3.3.2.1 String()

```js
String(123); // "123"
String(null); // "null"
String(undefined); // "undefined"

```

#### 3.3.2.2 toString()

> undefined & null do not have this method.

- seldom use.

```js
true.toString(); // "true"
(123).toString(); // "123"
(0b11).toString(); // "3"
```

#### 3.3.3.3 String Concatenation with Empty String ('')

```js
true + ''; // "true"

NaN + ''; // "NaN"

0b10 + ''; // "2"

'' + undefined; // "undefined"
```

### 3.3.3 Other Types to Boolean

#### 3.3.3.1 Boolean()

falsy values are converted to false:
- false
- `''`
- 0
- null
- NaN
- undefined

```js
Boolean(0); // false
Boolean(""); // false

```

other values are converted to true.

```js
console.log(Boolean(123)); // true
console.log(Boolean("abc")); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true
console.log(Boolean(" ")); // true
console.log(Boolean(Infinity)); // true
```

## 3.4 Extra

![language](language.png)

> Javascript is a weakly typed and dynamically typed scripting language.

> JavaScript is an interpreted language with JIT (Just-In-Time) compilation.

### 3.4.1 Dynamic Typed Language & Static Typed Language

> **dynamic typed language**.
> - variables declared are not associated with any type.
> - Its type is determined by the value assigned to it at runtime.
> - During code execution, it is important to check the data types.
> - e.g., JavaScript, Python, Ruby, PHP.

```js
/* JS */
var a = 2;
typeof a; // 'number'

a = "abc";
typeof a; // 'string'

```

> **static typed language**
> - variables must be declared with a type.
> - e.g., Java, C++, C#, etc.

```java
/* Java */
int a = 1;
float b = 1.68;
String c = "abc";
boolean d = true;
```

### 3.4.2 Weakly Typed Language & Strongly Typed Language

> - **Weakly Typed Language**
> > support implicit type conversion.
>
> - **Strongly Typed Language**
> do not support implicit type conversion.

```js
var a = '4';
var b = 1;

// Implicit type conversion
// string 4 is converted to number 4 during mathematic operation.

console.log(a - b); // 4 - 1 -> 3
```
### 3.4.3 What is Scripting Language?

> https://stackoverflow.com/questions/968461/why-is-javascript-called-a-scripting-language

- A language that interprets and executes at runtime.
- In the past, Js was purely interpreted, executing code line by line without prior compilation.
- Js is processed by Javascript engine (interpreter), which originally executes code line by line.
  - Now, modern Js engine uses JIT (Just-In-Time) compilation for better performance.
  - This makes Js a hybrid - an interpreted language with JIT compilation, combining both interpretation and compilation.

### 3.4.4 Compiled Language & Interpreted Language

- machine cannot understand our code.
- Our code has to be translated into what machine understands.

> **Compiled Language**
> - requires its source to be fully translated into machine code by a compiler before execution.
> - once compiled, the machine can use the machine code directly without the need of compiling again.
> - analogy: a translator translates the whole script for you before you use it for learning.
- most backend languages are compiled languages.
> **Interpreted Language**
> - run through a program line by line and execute each command every time.
> - analogy: a translator stands by your side and translates your script line by line for you.
> - Js is interpreted language but now it is a hybrid language.

### 3.4.5 Javascript Interpreter

> Rendering Engine: https://developer.mozilla.org/en-US/docs/Glossary/Engine/Rendering
> Javascript Engine: https://developer.mozilla.org/en-US/docs/Glossary/Engine/JavaScript

Two main components of the browsers are:
1. Rendering Engine: parse HTML & CSS e.g., Blink of Chrome (Old version: WebKit)
2. Javascript Engine: an interpreter that parses and interprets Javascript code. Modern Js engine use Just-in-time (JIT) compilation.

> Browsers do not know how to execute Js, it compiles and execute Js code through its built-in JavaScript Engine.
> When executing code, the JavaScript engine initially interprets it line by line, but modern engines use Just-In-Time (JIT) compilation to convert frequently executed code into optimized machine code for better performance, which is then executed by the computer.

