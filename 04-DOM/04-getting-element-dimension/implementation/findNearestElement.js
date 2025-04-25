var target = document.getElementById("target");
var boxes = document.querySelectorAll(".box");

// function findClosestElement(target) {
//   var siblings = target.parentNode.children;
//   var len = siblings.length;
//   // when the elements length is 0 or 1, there's no need to find the nearest element.
//   if (len <= 1) return null;
//   var candidates = [];
//   for (var i = 0; i < len; i++) {
//     if (siblings[i] !== target) {
//       var elemInfo = {};
//       elemInfo.elem = siblings[i];
//       elemInfo.dist = midpointDistance(target, siblings[i]);
//       candidates.push(elemInfo);
//     }
//   }
//   // store the first elemInfo as nearest
//   var closest = candidates[0];
//   for (var j = 1; j < candidates.length; j++) {
//     if (candidates[j].dist < closest.dist) {
//       closest = candidates[j];
//     }
//   }
//   return nearest.elem;
// }

function findClosestElement(target) {
  var siblings = target.parentNode.children;
  var len = siblings.length;
  if (len <= 1) return null;
  var nearestElem = null;
  var shortestDist = Infinity;
  for (var i = 0; i < len; i++) {
    if (siblings[i] !== target) {
      var dist = midpointDistance(target, siblings[i]);
      if (dist < shortestDist) {
        shortestDist = dist;
        nearestElem = siblings[i];
      }
    }
  }
  return nearestElem;
}

console.log(findClosestElement(target, boxes));
console.log(findClosestElement(boxes[1], boxes));
console.log(findClosestElement(boxes[3], boxes));
console.log(findClosestElement(boxes[0], boxes));
console.log(findClosestElement(boxes[2], boxes));
console.log(findClosestElement(boxes[4], boxes));
