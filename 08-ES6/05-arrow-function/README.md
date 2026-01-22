# Arrow Functions

> - problem to solve: 
> > - more concise way to write functions
> > - solve this binding issue by inheriting it from the outer scope.
> > > - e.g., previously, we need to put `this` in a variable called `that`, and use `that` inside callback of setTimeout to preserve `this`. With arrow function, this is not needed.


```js

const fn = () => {}

const fn2 = a => a ** 2; // the concise way -> remove () in param list, remove {} and return in fn body if only one line.

const fn3 = (a, b) => {
    return a + b;
}

const fn4 = (a, b) => ({
    value: a + b;
});

const fn5 = (a, b, c) => [a, b, c];
```

1. Do not have arguments
2. Do not have this
3. Cannot be used as a constructor
