/**
 * - check if elem1 and elem2 have collided.
 * - regardless of the elements are in viewport or in parent container.
 *
 * @param {HTMLElement} elem1 the first HTML element.
 * @param {HTMLElement} elem2 the second HTML element.
 * @returns {boolean} true if elem1 and elem2 are collided, otherwise false.
 */
function isCollided(elem1, elem2) {
  var r1 = elem1.getBoundingClientRect();
  var r2 = elem2.getBoundingClientRect();
  // Consider all the non-overlapping cases and negate.
  return !(
    r1.right < r2.left ||
    r2.right < r1.left ||
    r1.bottom < r2.top ||
    r2.bottom < r1.top
  );
}

/* In the past, the implementation is based on offsetLeft & offsetTop
    r1:
    L1 = box1.offsetLeft
    R1 = L1 + box1.offsetWidth
    T1 = box1.offsetTop
    B1 = T1 + box1.offsetHeight

    r2:
    L2: box2.offsetLeft
    R2: L2 + box2.offsetWidth
    T2: box2.offsetTop
    B2: T2 + box2.offsetHeight

    > you might want to get the absolute left, top, bottom, right value by recursively get to the edge of viewport.
*/

