# 05-Control Flow
[toc]
## 5.1 If Statement

> conditional statement / selection statement.
> if condition is truthy, the code inside `{}` (code block) is executed.
> - condition can be any value or expressions.
> - condition will be evaluted by converting to Boolean() internally by JS.

### 5.1.1 if statement (Single Alternative)
```js
/* Basic if statement. */
if (condition) {
  // Run if condition is true.
  // Code...
}

// Code after if statement...

```

> we can simplify the writing of if statement as one-liner.
> - works only when there's only one line of code in the code block `{}`!

```js
if (true) console.log("This is true.");

```

### 5.1.2 if-else statement (Double Alternative)

```js
if (condition) {
  // run when the condition is truthy.
} else {
  // run when the condition is falsy.
}
 
```

### 5.1.3 if-else if statement (Multiple Alternatives)

```js
if (condition1) {
  // run when condition1 is truthy.
} else if (condition2) {
  // run when condition1 is falsy and condition2 is truthy.
} else if (condition3) {
  // run when condition1 and condition2 is falsy, and condition3 is truthy.
} else {
  // run when the above conditions are falsy
}
```

### 5.1.4 Nested If statements

> JS allows nested if statements.
> Generally, we should not allow nesting more than 2 layers for better readability.

```js
if (condition) {
  // run when condition1 is truthy.
  // Nested if statement is allowed.
  if (condition) {

  } else {
    
  }
} else {
  // run when the above conditions are falsy.
  // Nested if statement is allowed.
  if (condition) {

  } else {

  }
}
```

## 5.2 Switch

> strictly compare expression / variable with val of each case.
> - no type conversion when compared.
> default is not mandatory.

```js
switch (expression / variable) {
  case val1:
    // statement
    break;
  case val2:
    // statement
    break;
  default:
    // statement
    break;
}

// without default
switch (expression / variable) {
  case val1:
    // statement
    break;
  case val2:
    // statement
    break;
}
```

### 5.2.1 Break
> `break` is used to break out the switch statement early, preventing the code from executing the subsequent case blocks.

**Without Break:**
> This causes a fall-through when a case is matched, meaning that all the cases after the matched one will be deemed matched and executed, until it meets a `break` keyword.

### 5.2.2 Multiple Cases Sharing a Code Block

> when you want to categorize a variable into different cases.

```js
switch (dayOfWeek) {
  /* Category 1 */
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("Weekday");
    break;

  /* Category 2 */
  case 0:
  case 6:
    console.log("Weekend");
}
```

### 5.2.3 Switch Expression as Boolean

```js
var a = Number(prompt("Enter your age: "));
// When expression of switch is a boolean type.
// when the case matches the true (expression) of switch.
switch (true) {
  case a >= 18: 
    console.log("Adult");
    break;
  // You can add more cases.
  default:
    console.log("Teenager");
    break;
}

```

### 5.2.4 Nested Switch Statement

```js
switch() {
  case val1:
    // code
    break;
  case val2:
    // code
    switch() {
      case val1:
        // code
        break;
        //
    }
    break;
    // ...
}
```

## 5.3 For
> a for loop consisted of three optional expressions.
> `initialization`: declare and initialize a loop control variable.
> `condition`: an expression evaluated before each loop iteration.
> `afterthought`: execute at the end of each loop iteration (increment / decrement / expression)

```js
for (initialization; condition; afterthought) {
  statement;
}
```


### 5.3.1 Nested For Loop

> recommend maximum 2 nestings.

```js
for (var i = 0; i < 5; i ++) {
  // loop body
  for (var j = 0; j < 5; j ++) {
    // loop body
  }
}

```
> outer for loop: control rows
> inner for loop: control columns

### 5.3.2 Printing Pattern

> outer loop controls rows.
> inner loop controls columns.


## 5.4 While

```js
while(condition) {

}
```


> while loop: suitable when you know the result.
> for loop: suitable when you know the range.

```js
// Cases when the for loop is not suitable.
// We don't know how many iterations to do
// for (var i = 0; i < ?; i++) {
// }

// We know the result
while (i ** 2 < 23450) {
  n++;
}
```

## 5.5 Do While

> post-test loop: do first and then see whether the condition is met or not.
> run at least once.

```js
do {
  // loop body
} while(condition)
```

## 5.6 Break, Continue, Label

> work with loop to control the flow.

### 5.6.1 Break
> use to break out of the current loop.
> when it is used inside the inner loop, it breaks out the inner loop, not the outer loop.


### 5.6.2 Continue

> terminate current iteration.


### 5.6.3 Labeled Statement

> How do you break out of the outer loop when you use break in the inner loop?

> we can label loop with identifier.
> use `break` / `continue` to break out the labeled loop.

```js
// label: identifier
// statement: code block
label: statement

// Example:
outer: for (var i = 0; i < 10; i ++) {}
```
