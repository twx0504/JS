String.prototype._toTitleCase = function () {
  var arr = this.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  return arr.join(" ");
};
