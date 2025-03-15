# JS Basics

[TOC]


## 01-Basic Syntax of Js

### 1.1 Where do you write JS?

> `<script>` can be written in head or body.

1. Inline Js
- rarely used.
- `<div onclick="alert("Hello World");">Click Me.</div>`  (Not recommended)
- `<a onclick="javascript:;">Disable Page Refresh</a>` (Occasionally, it is still used.)

2. Internal Js
- write within `<script>`
- `type` attribute refers to the type of script represented by the element.
  - Browsers converts the text content to Js and run.
  - Mainstream browsers only understand supported MIME type in the `type` attribute.
  - In HTML, `type` is optional (Default to `text/javascript` MIME Type)
  - to know more about `type` attribute: https://stackoverflow.com/questions/37440687/understanding-the-type-attribute-in-a-script-tag
```html
<!-- with type attribute -->
<script type="text/javascript">
    alert("Hello world");
</script>

<!-- ignore type -->
<script>
    alert("Hello world");
</script>

<!-- Invalid MIME Type - the js code will be treated as plain text. -->
<script type="text/notjavascript">
    <!-- Treat as plain text. -->
    alert("Hello world");
</script>
```

3. External Js
- write in a separate js file and import via `src` attribute of `<script>`.
- when using external js to load js file, writing internal js in the `<script>` will not work.

> External Js is commonly used.
> **Advantages:**
> - separation of concerns: keep JS separate from HTML.
> - reuse across multiple pages.
> - easy to maintain.
> - browsers cache js files, meaning they only need to be downloaded once. Future visits loads the files from cache instead of requesting it again, improve page load time. (HTTP)
> > **Extra: Cache Busting Knowledge:**
> > 1. Query String Cache Busting
> > - file name remains the same but adding the query string.
> > - when the query string changes, the browser will treat it as a different resource, and request the latest version.
> > `<script src="./demo.js?a=VbSKlS"></script>`
> > 2. Build Tools with Content Hash
> > - adding hash (based on its file content) to file name during build process.
> > - when the file content changes, a new hash is generated and the browser will request latest version.
> > `<script src="./svcjisWHUIjsak.js"></script>`
> > **Note**: If HTML is cached, it will still reference the old js filenames, preventing it from requesting new versions. Ensure HTML is not cached or implement proper cache control.
> **Disadvantage**
> - slightly increase the number of HTTP requests, but this is negligible due to the cache benefits.

> Note: Js is often used with HTML, but it can also run independently in various environment.

### 1.2 JS Comments

- single-line comment `//`
  - `Ctrl + /`
- multiline comment `/* */`
  - `Alt + Shift + a`

### 1.3 Important Notes on Javascript

1. Js is Case-sensitive

```js
alert("Hello"); // Correct
Alert("Hello"); // Wrong - it will not run.

```

2. Statements must use English characters, but strings can contain any characters.

3. End each statement with a semicolon `;`.
   - improve performance (Parsers will not need to add `;` for the code)
   - avoid errors / bugs when minifying (multiple statements on a line must be properly separated by `;`).
   - note: 
     - there's case when browsers insert `;` incorrectly.

4. Js will ignore spaces and new lines.  
   - note:
     - `""` or `''` can only be single line.
     - template string support multiline.
   - usage: use spaces and new lines properly to format your code.

### 1.4 Input & Output Statement
- alert
  - show a popup window / dialog box.
  - will block the subsequent code execution until you click confirm.
  - usage: debugging. (rare)
- console.log
- prompt
  - show a popup window for user to enter input.
  - will block the subsequent code execution.
  - use a variable to store the user input from prompt.

## 02-Variables & Literals

### 2.1 The Relationship among HDD, RAM & CPU

#### 2.1.1 Functions of HDD, RAM & CPU
1. **Hard Disk Drive (HDD)**: 
  - long-term / permanent storage of data and application.
  - speed: slow
  - data retains even no power is supplied.
2. **Random-Access memory (RAM) / Memory**: 
  - connect HDD & CPU.
  - short-term / temporary storage of data and application.
    - data that is read from HDD.
    - temp data comes from CPU, to be used next or stored in HDD.
  - speed: fast (100 times compared to HDD)
  - data lost when no supplying power.
3. **Central Processing Unit (CPU)**: 
  - give instruction
  - speed: fast (100 times compared to HDD)
  - data processing and computation.

#### 2.1.2 How Do They Work?

when we run application (Microsoft Excel):
1. CPU receives our instruction, and tells HDD to send the application to Memory.
2. CPU tells Memory to store the application there.
3. CPU runs the application when it is present in Memory already.
4. CPU will get and store temp data from Memory during processing.

#### 2.1.3 Why Do We Need Memory?

- CPU processes data very fast, but the access speed of HDD is very slow (even SSDs are slower in comparison).
- This huge speed difference wastes CPU processing power, and causes lag.
- Memory stores data using electrical charges, thus achieving instant access speed.
- Memory operates at a speed that matches the CPU processing power, eliminating the latency issue.

> When we open an application (Microsoft Excel), it takes time because the system reads data from HDD and loads data to memory.
> When the application is opened, there's no latency because CPU retrieves and stores temporary data to Memory.
> When we saved our work, the process becomes slow again, because the data must be transferred from Memory back to HDD, which takes time.


### 2.2 What are Variables

Analogy: variables are boxes used to store something (data).

Definition: A piece of memory allocated for the application to store data.

![variable](variable.png)

```js
var a = 10;
var b = "Wei Xin";
```
### 2.3 Declare Variables

- via `var` keyword.
```js
// a is a customized variable name.
// after declaring a variable with var,
// our computer will allocate a piece of memory, used to store data.
var a;
```
- assign value with `=`.
```js
a = "Wei Xin";

```
- access the data stored in the variable via the variable name.
```js
console.log(a);

```

> JS: 
> - How to store data to memory?
> - How to read data from memory?
> - How to operate data in memory?
> - How to release data from memory (Garbage Collection)? 
>   - debounce & throttle reduce memory usage.

### 2.4 Initialize Variables

- declare and assign value to variable in the meantime.

```js
var name = "Wei Xin";

```
### 2.5 Update Variable Value

Reassign value to a variable causes the previous value to be replaced in memory.

```js
/* Same scope */
/* Latter one replaces the previous one. */
var name = "Wei Xin";
/* Reassign value to a variable. */
name = "Hian Gee";

console.log(name); // Output: Hian Gee

/* 

  // This is working, but not recommended.
  // when reassigning, we do not declare.
  // Because of this, we can deem the following code as a mistake.

  var name = "Wei Xin";
  var name = "Hian Gee";
  console.log(name);  Output: Hian Gee

*/
```

> When reassigning a variable, we do not declare it again with var.
### 2.6 Declare Multiple Variables

Separate each variable with comma `,`.

1. Declare first before assign

```js
var x, y, z;

x = 1;
y = 2;
z = 3;

console.log(x, y, z);
```

2. Declare and Assign

```js
var x = 1, y = 2, z = 3;
console.log(x, y, z);

```

3. Assign and leave it unassigned during declaration process (Rare)

```js
var a, // Left unassigned
  b = 1,
  c = 3;
```
### 2.7 Special Cases of Variables

1. declare variable without assigning value, default to `undefined`.
> - it is related to variable hoisting.
> - usage: check if a variable is assigned successfully through the presence of `undefined`.
2. directly assign value without declaration, it is always becoming global variable.
- not recommended.
> One of the Js features.
> All global variables becomes members of window object.
> we can access it like this: `window.a`
3. directly use a non-existing variable.
- throw error.

### 2.8 Naming Variables (Identifiers)

when naming a variable, we must follow some rules of thumbs.

identifier: a name given by developers to anything in Js, namely variables, functions, classes, property names, etc.
#### 2.8.1 Syntax Rules for Identifiers

- contains letter, number, underscore `_`, `$`, but the name cannot start with number.

```js
// legal

abc a_b a1 $a

// illegal
8a abc#123 this a-b
```

- case-sensitive, a & A is two different variables.
- do not use `keywords` or `reserved words` as variable names.

#### 2.8.2 Keywords & Reserved Words

`keywords`: related to JS syntax.

`reserved words`: words that are kept aside for future versions. Some are reserved only in strict mode.

> Do not use any of those in the naming.

#### 2.8.3 Summary
1. contains only letters (A-Za-z), numbers (0-9), underscore (`_`) dollar (`$`), but cannot begin with number.
2. case sensitve
3. meaningful
4. no keywords / reserved words

### 2.9 Identifier Naming Convention

#### 2.9.1 camelCase (Recommended)

- the first letter of the first word is lowercased. The remaining words' first letter is capitalized.

```js
// myFirstName
// myStudentCount
// getBoxColor
// navList
```
> do not recommend all lowercased (e.g., myfirstname). Although it is not wrong, but it is not very readable.
> camelCase is recommended as some inherent JS features (e.g., array methods) are named this way.
#### 2.9.2 C Language Style

- all words are lowercased, and separate each word with underscore `_`.

```js
// my_first_name
// my_student_count

```

#### 2.9.3 Hungarian Notation
- identifier = type + description (e.g)

```js
iMyStudentCount /* i as integer (type) + myStudentCoujnt (description) */

```
> good to know but rarely used.

### 2.10 Literals
> Literals: https://developer.mozilla.org/en-US/docs/Glossary/Literal

- fixed values that would never change in js.
- e.g., 10, 'hello', true.
- we assign literals to variables.

```js
// Values like 1, "Hello", "Good" are literals.
// The variable A can be either 1, "Hello", "Good", etc.
var A = 1;
var A = "Hello";
var A = "Good";
```

> In real project, we usually use variables to store literals.
> some literals are super long to write.
> sometimes, it is used in multiple places, e.g., 100 places requires this literal.
> it is hard to write it 100 times, remember or even maintain.
> Store them in variables is better for maintenance.

### 2.11 Review

Applications:
- receive and output user prompt.
- exchange variable values.

### 2.12 Debugging & REPL Environment

#### 2.12.1 Common Errors
1. Uncaught SyntaxError
- e.g., write the wrong syntax, mix Chinese symbols with English ones, etc.
- VScode can detect and show the error while you are writing the code.


2. Uncaught ReferenceError
- when the variable is not defined / found. 
> - Always test your code in the browser console when you write JS.
> - aving bugs in your program is a common thing.
> - Learn to find and fix the bugs are an important skill to master.

#### 2.12.2 REPL

- REPL (Read-Eval-Print Loop)
  - define and run variables, functions, objects, etc.
  - browser console is a REPL environment.
  - used to test expressions and statements.

```js

^ ---> read ---> eval ---> print --->
|                                  |
|                                  |
<---------------Loop---------------v

```
> You can test your code in REPL without console.log method by typing and pressing enter your expression.

## 03-Data Types & Type Conversion

### 3.1 Introduction

#### 3.1.1 Why Do We Categorize Data into Different Types?

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

#### 3.1.2 Data Types

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

#### 3.1.3 Variable Types

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

#### 3.1.4 Typeof Operator

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

### 3.2 Five Basic Data Types

#### 3.2.1 Number

- all numbers including integers and floating-point numbers (decimal number) are of the number type.
- we can ignore the 0 before decimal point for number < 1 (Not recommended).

##### 3.2.1.1 Numbers with Different Bases
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
##### 3.2.1.2 Scientific Notation

- write very large / small numbers.
- e7 = 10^7
- e-7 = 10^-7

##### 3.2.1.3 Min Value & Max Value

- Due to the limitation of memory, JS can not represent all numbers.
- `Number.MIN_VALUE`: the smallest positive numeric value.
- `Number.MAX_VALUE`: the largest positive numeric value.

##### 3.2.1.4 Infinity

> What is the uppest limit / lowest limit for a number to reach Infinity / -Infinity?

- `Infinity`
- `-Infinity`


##### 3.2.1.5 NaN
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

#### 3.2.2 String

##### 3.2.2.1 String Literals

- value enclosed in English single (`''`) / double (`""`) quotation marks is called string.

- use single quotation inside double quotation marks or use double quotation inside single quotation marks is okay.


```js
/* This is recommended. */
console.log('Hello "Wei Xin"'); 

console.log("Hello 'Wei Xin'");

console.log("Hello \"Wei Xin\"");
```

##### 3.2.2.2 Escape Characters `\`

- tell Js this character has other meaning.
- example:
  - `\n`: new line
  - `\\`: backslash
  - `\'`: single quote
  - `\"`: double quote
  - `\t`: tab

> if you want to write special characters that have special meaning in JS in a string, you need to escape them.
> e.g., use "" inside "" you must escape the "" inside "".

##### 3.2.2.3 String Concatenation

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
##### 3.2.2.4 Empty String
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

##### 3.2.2.5 Length
returns the length of the string.

#### 3.2.3 Boolean

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

#### 3.2.4 Null

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
#### 3.2.5 Undefined

- value: `undefined`
- the default value when declaring an variable without assigning value.
- happens when:
  - variable declared but not assigned a value.
  - assigning value is not successful.

### 3.3 Type Conversion

- Javascript is a **weakly typed language** which means it allows implicit type conversion.

- three types of type conversion:
  - other types to number.
  - other types to string.
  - other types to boolean.

#### 3.3.1 Other Types to Number

##### 3.3.1.1 Number()

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

##### 3.3.1.2 parseInt()

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

#### 3.3.2 Other Types to String

- converts to exact string representation of the value.
- exception: scientific notation / different bases are converted to base 10.
- note: `null` & `undefined` do not have toString method.

##### 3.3.2.1 String()

```js
String(123); // "123"
String(null); // "null"
String(undefined); // "undefined"

```

##### 3.3.2.2 toString()

> undefined & null do not have this method.

- seldom use.

```js
true.toString(); // "true"
(123).toString(); // "123"
(0b11).toString(); // "3"
```

##### 3.3.3.3 String Concatenation with Empty String ('')

```js
true + ''; // "true"

NaN + ''; // "NaN"

0b10 + ''; // "2"

'' + undefined; // "undefined"
```

#### 3.3.3 Other Types to Boolean

##### 3.3.3.1 Boolean()

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

### 3.4 Extra

![language](language.png)

> Javascript is a weakly typed and dynamically typed scripting language.

> JavaScript is an interpreted language with JIT (Just-In-Time) compilation.

#### 3.4.1 Dynamic Typed Language & Static Typed Language

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

#### 3.4.2 Weakly Typed Language & Strongly Typed Language

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
#### 3.4.3 What is Scripting Language?

> https://stackoverflow.com/questions/968461/why-is-javascript-called-a-scripting-language

- A language that interprets and executes at runtime.
- In the past, Js was purely interpreted, executing code line by line without prior compilation.
- Js is processed by Javascript engine (interpreter), which originally executes code line by line.
  - Now, modern Js engine uses JIT (Just-In-Time) compilation for better performance.
  - This makes Js a hybrid - an interpreted language with JIT compilation, combining both interpretation and compilation.

#### 3.4.4 Compiled Language & Interpreted Language

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

#### 3.4.5 Javascript Interpreter

> Rendering Engine: https://developer.mozilla.org/en-US/docs/Glossary/Engine/Rendering
> Javascript Engine: https://developer.mozilla.org/en-US/docs/Glossary/Engine/JavaScript

Two main components of the browsers are:
1. Rendering Engine: parse HTML & CSS e.g., Blink of Chrome (Old version: WebKit)
2. Javascript Engine: an interpreter that parses and interprets Javascript code. Modern Js engine use Just-in-time (JIT) compilation.

> Browsers do not know how to execute Js, it compiles and execute Js code through its built-in JavaScript Engine.
> When executing code, the JavaScript engine initially interprets it line by line, but modern engines use Just-In-Time (JIT) compilation to convert frequently executed code into optimized machine code for better performance, which is then executed by the computer.


## 03-Data Type & Variable Declaration

## 04-Expressions & Operators
### 3.4 Extra

![language](language.png)

> Javascript is a weakly typed and dynamically typed scripting language.

> JavaScript is an interpreted language with JIT (Just-In-Time) compilation.

#### 3.4.1 Dynamic Typed Language & Static Typed Language

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

#### 3.4.2 Weakly Typed Language & Strongly Typed Language

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
#### 3.4.3 What is Scripting Language?

> https://stackoverflow.com/questions/968461/why-is-javascript-called-a-scripting-language

- A language that executes at runtime.
- In the past, Js was purely interpreted, executing code line by line without prior compilation.
- Js is processed by Javascript engine (interpreter), which originally executes code line by line.
  - Now, modern Js engine uses JIT (Just-In-Time) compilation for better performance.
  - This makes Js a hybrid - an interpreted language with JIT compilation, combining both interpretation and compilation.

#### 3.4.4 Compiled Language & Interpreted Language

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

#### 3.4.5 Javascript Interpreter

> Rendering Engine: https://developer.mozilla.org/en-US/docs/Glossary/Engine/Rendering
> Javascript Engine: https://developer.mozilla.org/en-US/docs/Glossary/Engine/JavaScript

Two main components of the browsers are:
1. Rendering Engine: parse HTML & CSS e.g., Blink of Chrome (Old version: WebKit)
2. Javascript Engine: an interpreter that parses and interprets Javascript code. Modern Js engine use Just-in-time (JIT) compilation.

> Browsers do not know how to execute Js, it compiles and execute Js code through its built-in JavaScript Engine.
> When executing code, the JavaScript engine initially interprets it line by line, but modern engines use Just-In-Time (JIT) compilation to convert frequently executed code into optimized machine code for better performance, which is then executed by the computer.
## 05-Control Flow

## 06-Array & Array API

## 07-Function

## 08-Variable Hoisting, Scope

