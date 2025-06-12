function search(str, reg) {
  var res = [];
  var match = reg.exec(str);
  if (reg.global) {
    while (match) {
      res.push(match[0]);
      match = reg.exec(str);
    }
  } else {
    res.push(match && match[0]);
  }

  return res;
}
