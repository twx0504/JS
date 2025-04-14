var obj = {
  a: 1,
  b: 2,
};

function sum(a, b) {
  console.log(a, b);
  console.log("this", this.a, this.b);
}

var fn = sum.bind(obj, 4);
fn(5);

// Bind
// 1. change this
// 2. return a new fn
// 3. preset parameter