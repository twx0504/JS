const privates = new WeakMap(); // This acts as an internal slot.
class Stack {
  constructor(size) {
    this.size = size;
    privates.set(this, []);
  }

  push(val) {
    console.log(this);
    // when using proxy, privates.get(this) returns undefined.
    // undefined.push(val) throws exception.
    privates.get(this).push(val);
    return this;
  }

  view() {
    console.log(this);
    console.log(privates.get(this));
  }
}

export default Stack;
