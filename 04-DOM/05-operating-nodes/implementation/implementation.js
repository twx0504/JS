HTMLElement.prototype._children = function () {
  var children = this.childNodes;
  var len = children.length;
  var res = [];
  for (var i = 0; i < len; i++) {
    var node = children[i];
    if (node.nodeType === Node.ELEMENT_NODE) {
      res.push(node);
    }
  }
  return res;
};

HTMLElement.prototype._nextElementSibling = function () {
  var nextNode = this.nextSibling;
  while (nextNode !== null && nextNode.nodeType !== Node.ELEMENT_NODE) {
    nextNode = nextNode.nextSibling;
  }
  return nextNode;
};

Node.prototype._insertAfter = function (newNode, referenceNode) {
  if (arguments.length < 2) {
    throw new DOMException("newNode and referenceNode must both be passed.");
  }

  if (
    !(newNode instanceof Node) ||
    (referenceNode !== null && !(referenceNode instanceof Node))
  ) {
    throw new DOMException(
      "newNode must be an instance of Node, referenceNode can either be an instance of Node or null."
    );
  }

  if (referenceNode === null) {
    this.appendChild(newNode);
    return newNode;
  }

  if (referenceNode.parentNode !== this) {
    throw new DOMException(
      "Reference node is not the child of " + this.nodeName
    );
  }

  return this.insertBefore(newNode, referenceNode.nextSibling);
  // var children = Array.prototype.slice.call(this.childNodes);

  // var nextIndex = children.indexOf(referenceNode) + 1;

  // children.splice(nextIndex, 0, newNode);
  // var parent = this;
  // children.forEach(function (item) {
  //   parent.appendChild(item);
  // });
};

Node.prototype._removeChildren = function () {
  var lastChild = this.lastChild;
  while (lastChild !== null) {
    this.removeChild(lastChild);
    lastChild = this.lastChild;
  }
  // this.innerHTML = "";
};

/**
 * Swap position between elem1 and elem2 within the current element.
 * @param {HTMLElement} elem1
 * @param {HTMLElement} elem2
 */
HTMLElement.prototype._exchangeElementPosition = function (elem1, elem2) {
  if (!(elem1 instanceof HTMLElement) || !(elem2 instanceof HTMLElement)) {
    throw new DOMException("elem1 & elem2 must be HTMLElement.");
  }
  if (elem1 === elem2) {
    throw new DOMException("elem1 & elem2 must be different element.");
  }
  var ref = elem1.nextElementSibling;
  var isAdjacent = ref === elem2;
  this.replaceChild(elem1, elem2);
  if (isAdjacent) {
    this.insertBefore(elem2, elem1);
  } else {
    this.insertBefore(elem2, ref);
  }
};

/**
 * Swap position between current element and given elem.
 * @param {HTMLElement} elem
 * @throws {DOMException} If the provided element is not an HTMLElement.
 */
HTMLElement.prototype._exchange = function (elem) {
  if (!(elem instanceof HTMLElement)) {
    throw new DOMException("elem must be an instance of HTMLElement.");
  }
  var p1 = this.parentNode;
  var p2 = elem.parentNode;
  // Create a placeholder element based on elem's nodeName
  var placeholder = document.createElement(this.nodeName);
  // Insert a placeholder element in front of element.
  p1.insertBefore(placeholder, this);
  var replacedElem = p2.replaceChild(this, elem);
  p1.replaceChild(replacedElem, placeholder);
};
