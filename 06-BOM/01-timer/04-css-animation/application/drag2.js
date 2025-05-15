/**
 * Implementation of drag fn using this.
 * require the use of bind fn to explicitly bind this to this dragFn
 */
var dragFn2 = (function () {
  return function drag(e) {
    // this refers to the drag target element.
    // distance between pointer and the viewport edges.
    var _clientX = e.clientX;
    var _clientY = e.clientY;

    // distance between elem and the container edges.
    var _offsetLeft = this.offsetLeft;
    var _offsetTop = this.offsetTop;

    // dragTarget size
    var dragWidth = this.offsetWidth;
    var dragHeight = this.offsetHeight;

    // parent container size
    var parentWidth = this.offsetParent.clientWidth;
    var parentHeight = this.offsetParent.clientHeight;

    // calculate boundary size
    var maxLeft = parentWidth - dragWidth;
    var maxTop = parentHeight - dragHeight;

    var that = this; // store the current context.

    // event is attached to document, ensure the dragging works even the pointer is out of the container.
    document.addEventListener("mousemove", handleMouseMove);

    function handleMouseMove(e) {
      // this inside here refers to #document object. 

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

      that.style.left = newLeft + "px";
      that.style.top = newTop + "px";
    }
    document.addEventListener("mouseup", handleMouseUp);

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };
})();
