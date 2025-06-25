let data = {
  name: "twx",
  age: 25,
};

// Implement template string functionality for regular string.


/* IMPLEMENTATION with FUNCTION CONSTRUCTOR */

function parseString(str, data) {
  const reg = /\${(.+?)}/g; // note: use . instead of \w because it encompasses the operation symbols.
  str = str.replace(reg, function (_, p1) {
    return Function("data", "return " + p1)(data);
  });
  return str;
}
console.log(
  parseString("Hi, I am ${data.name}, I am ${data.age} years old.", data)
);
