Object._create = function (proto, propertiesObject) {
  // null or object
  if (proto !== null && !(proto instanceof Object)) {
    throw new TypeError("Proto must be an object or null.");
  }
  // implement inheritance
  function Fn() {}
  Fn.prototype = proto; // If proto is null, newObj.__proto__ will default to Object.prototype (not null) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
  var newObj = new Fn();
  // Adding properties
  // only when propertiesObject is an instance of Object, then we set properties on it.
  propertiesObject instanceof Object &&
    Object.defineProperties(newObj, propertiesObject);

  return newObj;
};
