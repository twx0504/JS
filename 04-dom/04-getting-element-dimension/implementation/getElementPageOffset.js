HTMLElement.prototype._pageLeft = function () {
  var pageLeft = this.offsetLeft;
  var ancestor = this.offsetParent;
  while (ancestor) {
    pageLeft += ancestor.offsetLeft;
    var style = getComputedStyle(ancestor);
    pageLeft += parseFloat(style.borderLeftWidth);
    ancestor = ancestor.offsetParent;
    /* Trying to log offsetLeft here might throw TypeError */
  }
  return pageLeft;
};

HTMLElement.prototype._pageLeftR = function () {
  var pageLeft = this.offsetLeft;
  var ancestor = this.offsetParent;
  if (ancestor) {
    pageLeft += ancestor._pageLeftR();
    var style = getComputedStyle(ancestor);
    pageLeft += parseFloat(style.borderLeftWidth);
  }
  return pageLeft;
};

HTMLElement.prototype._pageTop = function () {
  var pageTop = this.offsetTop;
  var ancestor = this.offsetParent;

  while (ancestor) {
    pageTop += ancestor.offsetTop;
    var style = getComputedStyle(ancestor);
    pageTop += parseFloat(style.borderTopWidth);
    ancestor = ancestor.offsetParent;
    /* Trying to log offsetTop here might throw TypeError */
  }
  return pageTop;
};

HTMLElement.prototype._pageTopR = function () {
  var pageTop = this.offsetTop;
  var ancestor = this.offsetParent;
  if (ancestor) {
    pageTop += ancestor._pageTopR();
    var style = getComputedStyle(ancestor);
    pageTop += parseFloat(style.borderTopWidth);
  }
  return pageTop;
};

HTMLElement.prototype._pageOffset = function () {
  var pageOffsetLeft = this._pageLeft();
  var pageOffsetTop = this._pageTop();
  return {
    left: pageOffsetLeft,
    top: pageOffsetTop,
  };
};
