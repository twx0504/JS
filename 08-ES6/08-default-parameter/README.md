# Function Default Parameter    

```js

// Before ES6

function fn(a, b) {
    if (typeof a === "undefined") a = 0;
    if (typeof b === "undefined") b = 0;
}

// ES6+
function fn(a = 0, b = 0) {}
```



1. It is common to write the default parameter at the back.
2. When using default parameters, there forms a scope.
3. Default parameters uses lazy evaluation - only use when the parameter value are strictly undefined.
4. Default parameters and the rest of the parameters after the default parameters are not included in the function length property.