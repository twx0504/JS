let obj = {
  name: "twx",
  age: 25,
};

// Implement template string functionality for regular string.

function parseString(str, data) {
  const reg = /\${(.+?)}/g; // note: use . instead of \w because it encompasses the operation symbols.
  str = str.replace(reg, function (_, p1) {
    // validate p1 using regexp if this function is exposed to users.
    // eval is good if you do not expose to user.
    // alternative: Function constructor.
    return eval(p1); // eval is able to process string.
  });
  return str;
}

console.log(parseString("Hi, I am ${obj.name}, I am ${obj.age} years old."));

let a = 1;
let b = 2;
let msg = "a+b=${a+b}";
console.log(parseString(msg));

const fn = function () {
  return obj.age >= 18 ? "Adult" : "Minor";
};

msg = "a+b=${fn()}";
console.log(parseString(msg));
