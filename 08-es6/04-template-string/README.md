# Template String

> - using backtick `.
> - benefit:
> > - easy variable injection dynamically, no more string concatenation
> > - multiline string support
> - tagged template (fn + template string) allows more advanced and custom string processing.


```js
// String - three of them are similar.
"this is a regular string.";
'this is a regular string too.';
`this is a template string.`;

// Multiline

`
    This is a multiline
    string. It will preserve the white space, new line etc.
`



// String Interpolation - no more string concatenation with + operator.
`I am ${expression}`;


// Tagged Template
function tagFn(strArr, expression1, expression2){
    // Process string
    // You can do whatever you want.
}

tagFn`I am ${expression1}, I am ${expression2} years old.`;
```