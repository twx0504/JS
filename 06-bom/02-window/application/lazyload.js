(function () {
  function lazyLoad() {
    // lazy loading images
    // 1. get all images with class 'lazy'
    var imgs = document.querySelectorAll("img.lazy"); // simpler alternative: document.getElementsByClassName("img.lazy");
    // 2. filter out non-image elements
    imgs = Array.prototype.filter.call(imgs, function (item) {
      // filtering logic
      // e.g., adding "loading image failed" in img alt to notify the user.
      return item instanceof HTMLImageElement;
      // return item.dataset.src;
      // return item instanceof Image;
    });

    lazy(); // initial load

    // the rest of the imgs will be loaded via scroll and resize event.
    // resize: for responsiveness.
    window.addEventListener("resize", throttle(lazy, 300)); // usually we can set it to 100ms
    window.addEventListener("scroll", throttle(lazy, 300));
    function lazy() {
      if (imgs.length === 0) {
        return; // no more images to load
      }
      var viewportSize = domUtils.getViewportSize();
      var viewportHeight = viewportSize.h;
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var rect = img.getBoundingClientRect();
        var imgTop = rect.top;
        var imgBottom = rect.bottom;

        if (imgBottom > 0 && imgTop < viewportHeight) {
          img.src = img.dataset.src; // set the src attribute to the data-src value
          // once the image is loaded, you can remove the 'lazy' class if needed
          var index = imgs.indexOf(img);
          imgs.splice(index, 1); // remove the image from the array
          i--; // adjust the index since we removed an item
        }
      }
    }
  }
  function throttle(callback, delay) {
    var timer = null;
    return function () {
      if (timer) {
        return; // if timer is already set, do nothing
      }
      var args = arguments;
      var that = this;
      timer = setTimeout(function () {
        callback.apply(that, args);
        timer = null; // reset the timer
      }, delay);
    };
  }

  window.lazyLoad = lazyLoad; // expose lazyLoad function to the global scope
})();
