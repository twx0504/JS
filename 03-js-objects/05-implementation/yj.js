Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === null || ctx === undefined ? globalThis : new Object(ctx);
  const fn = this;
  const key = Symbol();
  ctx[key] = this;
  Object.defineProperty(ctx, key, {
    value: this,
    enumerable: false,
  });
  const r = ctx[key](...args);
  delete ctx[key];
  return r;
};

function fn(a, b, c) {
  console.log(a, b, c);
  console.log("this", this);
}

fn.myCall({ a: 1 }, 2, 3, 4);
