(function () {
  const a = data.max;
  const b = data.min;

  function max() {
    return a > b ? a : b;
  }
  window.max = max; // expose max as window property
})();
