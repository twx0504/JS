/**
 * Compute the midpoint distance between elements that are positioned absolute to the same parent.
 * @param {HTMLElement} elem1 first element
 * @param {HTMLElement} elem2 second element
 * @returns
 */
function midpointDistance(elem1, elem2) {
  var p1 = {
    x: elem1.offsetLeft + elem1.offsetWidth / 2,
    y: elem1.offsetTop + elem1.offsetHeight / 2,
  };

  var p2 = {
    x: elem2.offsetLeft + elem2.offsetWidth / 2,
    y: elem2.offsetTop + elem2.offsetHeight / 2,
  };

  return Number(Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2).toFixed(2));
}
