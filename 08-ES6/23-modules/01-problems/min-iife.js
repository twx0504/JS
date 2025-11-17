(function () {
  const a = data.max;
  const b = data.min;
  function min() {
    return a > b ? b : a;
  }
  window.min = min; // expose min as window property
})();
