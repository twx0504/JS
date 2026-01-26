String.prototype._count = function (search, position) {
  if (position === undefined) position = 0;
  if (typeof position !== "number") {
    throw new TypeError("position can only be of number type.");
  }
  var count = 0;
  var position = this.indexOf(search, position);
  while (position !== -1) {
    count++;
    position = this.indexOf(search, position + 1);
  }
  return count;
};
