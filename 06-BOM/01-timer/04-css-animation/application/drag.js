/**
 * Implementation of drag fn with explicitly passing element.
 */
var dragFn1 = (function () {
  return function drag(e, el) {
    // distance between pointer and the viewport edges.
    var _clientX = e.clientX;
    var _clientY = e.clientY;

    // distance between elem and the container edges.
    var _offsetLeft = el.offsetLeft;
    var _offsetTop = el.offsetTop;

    // dragTarget size
    var dragWidth = el.offsetWidth;
    var dragHeight = el.offsetHeight;

    // parent container size
    var parentWidth = el.offsetParent.clientWidth;
    var parentHeight = el.offsetParent.clientHeight;

    // calculate boundary size
    var maxLeft = parentWidth - dragWidth;
    var maxTop = parentHeight - dragHeight;

    // event is attached to document, ensure the dragging works even the pointer is out of the container.
    document.addEventListener("mousemove", handleMouseMove);

    function handleMouseMove(e) {
      // distance between pointer and the viewport edges after moving.
      var _movedClientX = e.clientX;
      var _movedClientY = e.clientY;

      // distance of the pointer movement
      var _x = _movedClientX - _clientX;
      var _y = _movedClientY - _clientY;

      // check boundary
      var newLeft = _x + _offsetLeft;
      var newTop = _y + _offsetTop;

      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft > maxLeft) {
        newLeft = maxLeft;
      }

      if (newTop < 0) {
        newTop = 0;
      } else if (newTop > maxTop) {
        newTop = maxTop;
      }
      
      el.style.left = newLeft + "px";
      el.style.top = newTop + "px";
    }
    document.addEventListener("mouseup", handleMouseUp);

    function handleMouseUp(e) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };
})();
