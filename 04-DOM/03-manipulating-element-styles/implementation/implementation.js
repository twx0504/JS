/* Implement type checking */
HTMLElement.prototype._validateClassNames = function (args) {};

/**
 * add a class / classes to an element.
 *
 */
HTMLElement.prototype._add = function () {
  var classNames = this.className.split(" ");
  var len = arguments.length;
  for (var i = 0; i < len; i++) {
    if (arguments[i].includes(" ")) return;
    if (classNames.includes(arguments[i])) continue;
    classNames.push(arguments[i]);
  }
  this.className = classNames.join(" ");
};

// ['box', 'color', 'circle']
// remove('color') => ['box']
// remove('color', 'box') => ['circle']
HTMLElement.prototype._remove = function () {
  var classNames = this.className.split(" ");
  var unwanted = {};
  var res = [];
  /* Convert arguments to an object for key lookup purpose. */
  for (var i = 0; i < arguments.length; i++) {
    unwanted[arguments[i]] = arguments[i]; /* we only care about keys. */
  }
  /* Exclude unwanted class names */
  for (var i = 0; i < classNames.length; i++) {
    if (unwanted.hasOwnProperty(classNames[i])) continue;
    res.push(classNames[i]);
  }
  this.className = res.join(" ");
};

HTMLElement.prototype._toggle = function (token, force) {
  //   token = typeof token === "string" ? token : String(token);
  if (typeof token !== "string") {
    throw new TypeError("TypeError: Token must be passed as a string!");
  }

  if (force !== undefined && typeof force !== "boolean") {
    throw new TypeError("TypeError: Force must be passed as a boolean.");
  }
  //   force = force === undefined ? undefined : Boolean(force);

  var hasToken = this.className.split(" ").includes(token);
  if (force === undefined) {
    // hasToken ? this._remove(token) : this._add(token);
    this[hasToken ? "_remove" : "_add"](token);
    return !hasToken;
  } else {
    // force ? this._add(token) : this._remove(token);
    this[force ? "_add" : "_remove"](token);
    return force;
  }
};
