# 01 Basic Syntax of Js

## 1.1 Where do you write JS?

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

## 1.2 JS Comments

- single-line comment `//`
  - `Ctrl + /`
- multiline comment `/* */`
  - `Alt + Shift + a`

## 1.3 Important Notes on Javascript

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

## 1.4 Input & Output Statement
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

## 2.1 The Relationship among HDD, RAM & CPU

### 2.1.1 Functions of HDD, RAM & CPU
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

### 2.1.2 How Do They Work?

when we run application (Microsoft Excel):
1. CPU receives our instruction, and tells HDD to send the application to Memory.
2. CPU tells Memory to store the application there.
3. CPU runs the application when it is present in Memory already.
4. CPU will get and store temp data from Memory during processing.

### 2.1.3 Why Do We Need Memory?

- CPU processes data very fast, but the access speed of HDD is very slow (even SSDs are slower in comparison).
- This huge speed difference wastes CPU processing power, and causes lag.
- Memory stores data using electrical charges, thus achieving instant access speed.
- Memory operates at a speed that matches the CPU processing power, eliminating the latency issue.

> When we open an application (Microsoft Excel), it takes time because the system reads data from HDD and loads data to memory.
> When the application is opened, there's no latency because CPU retrieves and stores temporary data to Memory.
> When we saved our work, the process becomes slow again, because the data must be transferred from Memory back to HDD, which takes time.


## 2.2 What are Variables

Analogy: variables are boxes used to store something (data).

Definition: A piece of memory allocated for the application to store data.

![variable](variable.png)

```js
var a = 10;
var b = "Wei Xin";
```
## 2.3 Declare Variables

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

## 2.4 Initialize Variables

- declare and assign value to variable in the meantime.

```js
var name = "Wei Xin";

```
## 2.5 Update Variable Value

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
## 2.6 Declare Multiple Variables

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
## 2.7 Special Cases of Variables

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

## 2.8 Naming Variables (Identifiers)

when naming a variable, we must follow some rules of thumbs.

identifier: a name given by developers to anything in Js, namely variables, functions, classes, property names, etc.
### 2.8.1 Syntax Rules for Identifiers

- contains letter, number, underscore `_`, `$`, but the name cannot start with number.

```js
// legal

abc a_b a1 $a

// illegal
8a abc#123 this a-b
```

- case-sensitive, a & A is two different variables.
- do not use `keywords` or `reserved words` as variable names.

### 2.8.2 Keywords & Reserved Words

`keywords`: related to JS syntax.

`reserved words`: words that are kept aside for future versions. Some are reserved only in strict mode.

> Do not use any of those in the naming.

### 2.8.3 Summary
1. contains only letters (A-Za-z), numbers (0-9), underscore (`_`) dollar (`$`), but cannot begin with number.
2. case sensitve
3. meaningful
4. no keywords / reserved words

## 2.9 Identifier Naming Convention

### 2.9.1 camelCase (Recommended)

- the first letter of the first word is lowercased. The remaining words' first letter is capitalized.

```js
// myFirstName
// myStudentCount
// getBoxColor
// navList
```
> do not recommend all lowercased (e.g., myfirstname). Although it is not wrong, but it is not very readable.
> camelCase is recommended as some inherent JS features (e.g., array methods) are named this way.
### 2.9.2 C Language Style

- all words are lowercased, and separate each word with underscore `_`.

```js
// my_first_name
// my_student_count

```

### 2.9.3 Hungarian Notation
- identifier = type + description (e.g)

```js
iMyStudentCount /* i as integer (type) + myStudentCoujnt (description) */

```
> good to know but rarely used.

## 2.10 Literals
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

## 2.11 Review

Applications:
- receive and output user prompt.
- exchange variable values.

## 2.12 Debugging & REPL Environment

### 2.12.1 Common Errors
1. Uncaught SyntaxError
- e.g., write the wrong syntax, mix Chinese symbols with English ones, etc.
- VScode can detect and show the error while you are writing the code.


2. Uncaught ReferenceError
- when the variable is not defined / found. 
> - Always test your code in the browser console when you write JS.
> - aving bugs in your program is a common thing.
> - Learn to find and fix the bugs are an important skill to master.

### 2.12.2 REPL

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
