# Rest Parameter

> - used to receive an indefinite number of arguments and store them in an array.

```js
// rest parameter
function (a, b, ...rest) {}


// rest element in destructuring

let [a, b, ...rest] = [1, 2, 3, 4, 5];

let {a, b, ...c} = {a:1, b:2, c:3, d:4, e:5};


```

**Important Notes**:
1. Rest parameter / rest element must be the last parameter.
2. Rest parameter can be used to replace arguments, especially in arrow function.
   1. Since rest parameter is fundamentally an array, it is able to use the array method, unlike arguments object.
3. Rest parameter is not counted in the function length property.
4. When an arrow function only has one parameter and it is a rest parameter, you cannot neglect the `()`.

