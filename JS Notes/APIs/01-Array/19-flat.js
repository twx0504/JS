function myFlat(arr, depth) {
  if (!Array.isArray(arr)) return [];
  depth =
    !Number.isNaN(Number(depth)) && !Number.isNaN(parseInt(depth)) ? depth : 0;
  depth = Math.abs(depth);
  if (depth === 0) return arr.slice();
  var res = [];
  function _flat(arr, depth) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      if (Array.isArray(arr[i])) {
        if (depth > 0) {
          _flat(arr[i], --depth); // pre-increment!
          // Alternative
          // depth--;
          // _flat(arr[i], depth);
          depth++;
        } else {
          res.push(arr[i]);
        }
      } else {
        res.push(arr[i]);
      }
    }
  }
  _flat(arr, depth);
  return res;
}
