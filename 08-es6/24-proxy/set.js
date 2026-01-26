const obj = {
  name: "tooweixin",
  age: 25,
  _gender: "male",
};
const handler = {
  set(target, key, val) {
    if (key[0] === "_") {
      // Ensure the assignment of property name starting with "-" throws an Error.
      throw new Error("Assignment on private property is forbidden.");
    }
    target[key] = val;
    return true;
  },
};
const proxy = new Proxy(obj, handler);

// We can export the proxy with the alias "obj" - this is allowed.
// This can prevent the user from directly operating on the original object.
// If one day, we don't need proxy anymore, and remove the code, the user is still accessing obj.
export { proxy as obj};
