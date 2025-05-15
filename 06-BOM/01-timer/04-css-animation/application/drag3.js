/**
 * Adds drag functionality to an HTMLElement by allowing it to be dragged
 * within its parent container with customizable behavior on drag start,
 * drag move, and drop events. Optionally, a conditional function can be
 * provided to control whether the drag operation is initiated.
 *
 * @param {Function} ondragstart - Callback function that is triggered when the drag operation starts.
 *                                 It receives the mouse event as an argument.
 * @param {Function} ondrag - Callback function that is triggered continuously as the element is being dragged.
 *                             It receives the mouse event as an argument.
 * @param {Function} ondrop - Callback function that is triggered when the drag operation ends (drop event).
 *                            It receives the mouse event as an argument.
 * @param {Function} [shouldDrag] - A conditional function that is called before starting the drag.
 *                                      If the function returns `false`, the drag operation is not initiated.
 *                                      This can be used to apply additional conditions to the drag behavior.
 *
 * @returns {void}
 *
 * @example
 * Example usage of _drag to implement a draggable box in ES5
 * var draggableElement = document.querySelector(".box");
 * draggableElement._drag(
 *   function(e) { console.log("Drag started", e); },
 *   function(e) { console.log("Dragging", e); },
 *   function(e) { console.log("Drop", e); },
 *   function(e) { return e.target.classList.contains("title"); } // Only drag if the title is clicked
 * );
 */
HTMLElement.prototype._drag = function (
  shouldDrag,
  ondragstart,
  ondragmove,
  ondragend
) {
  this.addEventListener("mousedown", handleMousedown);
  var that = this;
  function handleMousedown(e) {
    // stop default behaviours e.g., text / img that causes our drag function to not work.
    e.preventDefault();

    if (typeof shouldDrag === "function" && !shouldDrag(e)) return;
    typeof ondragstart === "function" && ondragstart(e);
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

    // event is attached to document, ensure the dragging works even the pointer is out of the container.
    var throttledMouseMove = throttle(handleMouseMove);
    document.addEventListener("mousemove", throttledMouseMove);

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

      // check for position not exceeding maximum, then check for position not going below minimum.
      // var newLeft = Math.max(0, Math.min(_x + _offsetLeft, maxLeft));
      // var newTop = Math.max(0, Math.min(_y + _offsetTop, maxTop));
      that.style.left = newLeft + "px";
      that.style.top = newTop + "px";
      typeof ondragmove === "function" && ondragmove(e);
    }
    document.addEventListener("mouseup", handleMouseUp);

    function handleMouseUp(e) {
      document.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      typeof ondragend === "function" && ondragend(e);
    }
  }
};

function throttle(callback, duration = 20) {
  var timer = null;

  // return a throttled event handler.
  return function () {
    if (timer) return;
    var args = [];
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
      args.push(arguments[i]);
    }
    var context = args[0] instanceof Event ? args[0].target : this;
    timer = setTimeout(function () {
      // execute callback first.
      typeof callback === "function" && callback.apply(context, args);
      // unlock.
      timer = null;
    }, duration);
  };
}
