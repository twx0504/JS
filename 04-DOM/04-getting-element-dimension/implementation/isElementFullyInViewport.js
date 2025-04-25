/**
 * Check if an element is located within the viewport.
 * @param {HTMLElement} elem target element to be checked.
 * @returns {boolean} true if the elem is within the viewport. Otherwise false.
 */
function isElementFullyInViewport(elem) {
  var documentRect = document.documentElement.getBoundingClientRect();
  var elemRect = elem.getBoundingClientRect();
  return (
    elemRect.left >= documentRect.left &&
    elemRect.top >= documentRect.top &&
    documentRect.bottom >= elemRect.bottom &&
    documentRect.right >= elemRect.right
  );
}

function isFullyContained(elem, parent){

}


// function isElementFullyInViewport(elem) {
//   /* Compatibility:  */
//   var viewportWidth =
//     document.documentElement.clientWidth || document.body.clientWidth;
//   var viewportHeight =
//     document.documentElement.clientHeight || document.body.clientHeight;
  
//     var elemRect = elem.getBoundingClientRect();
//   return (
//     elemRect.left >= 0 &&
//     elemRect.top >= 0 &&
//     viewportHeight >= elemRect.bottom &&
//     viewportWidth >= elemRect.right
//   );
// }
