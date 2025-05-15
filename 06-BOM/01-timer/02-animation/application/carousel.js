// DOM
// TODO: Add the last li clone.
var dom = {
  ul: document.querySelector(".banner ul"),
  lis: null,
  navDots: document.querySelector(".banner .nav-dots"),
  spans: null,
  prev: document.querySelector(".prev"),
  next: document.querySelector(".next"),
};
/* Slides */
dom.lis = document.querySelectorAll(".banner > ul > li "); // querySelectorAll returns the non-live NodeList, it will not include the cloned slides added later.
var slideWidth = dom.lis[0].clientWidth; // the slide width.
var totalSlides = dom.lis.length; // the total number of slides, excluding cloned ones.

// Clone the first and last slides
var firstSlide = dom.lis[0];
var clonedfirstSlide = firstSlide.cloneNode(true);
var lastLi = dom.lis[totalSlides - 1];
var clonedLastLi = lastLi.cloneNode(true);
// Insert the first and last slide to ul.
dom.ul.appendChild(clonedfirstSlide); // Insert cloned first slide to the end.
dom.ul.insertBefore(clonedLastLi, firstSlide); // Insert cloned last slide to the beginning.
// Adjust the initial positioning, shows the real first slide.
dom.ul.style.left = slideWidth * -1 + "px";

/* Navigation Dots - only matching the real slides */
dom.spans = dom.navDots.children; // alternative: querySelectorAll - but it doesn't matter here.
var dotCount = dom.spans.length;
var currentSpan = dom.spans[0];
var currentIndex = 0;
var intervalId = null;
var lock = false;

autoPlay(2000);

// Auto Carousel
function autoPlay(interval) {
  clearInterval(intervalId);
  intervalId = setInterval(function () {
    toNext();
  }, interval);
}

function stopTimer(timerId) {
  clearInterval(timerId);
  intervalId = null;
}

function setClassName(currentEl, targetEl, className) {
  currentEl.classList.remove(className);
  targetEl.classList.add(className);
}

// navigation dots: handling mouseover and mouseleave events
for (var i = 0; i < dotCount; i++) {
  var span = dom.spans[i];
  span.dataset.index = i;
  span.addEventListener("mouseover", function () {
    stopTimer(intervalId);
  });
  span.addEventListener("mouseout", function () {
    autoPlay(2000);
  });
}

// navigation dots: handling click event
dom.navDots.addEventListener("click", function (e) {
  var eventTarget = e.target;
  if (eventTarget.tagName !== "SPAN") return;
  // note: only for span.
  if (lock) return; // there's elements switching.
  lock = true;
  var targetIndex = parseInt(eventTarget.dataset.index);
  // We need to add 1 because of the cloned slide at the beginning
  /**
   * Slide Index Mapping (after cloning):
   *
   * To enable seamless infinite looping, we clone:
   *   - The **last slide** and insert it at the beginning.
   *   - The **first slide** and append it at the end.
   *
   * This results in the following DOM structure:
   *
   *   | DOM Index | Slide                         | Position   |
   *   |-----------|-------------------------------|------------|
   *   | 0         | Cloned Last Slide (fake)      | 0          |
   *   | 1         | Real Slide 0                  |1 slideWidth|
   *   | 2         | Real Slide 1                  |2 slideWidth|
   *   | ...       | ...                           |3 slideWidth|
   *   | n         | Real Slide n-1                |4 slideWidth|
   *   | n + 1     | Cloned First Slide (fake)     |5 slideWidth|
   *
   * Therefore:
   * - When navigating to logical slide index `i`, the actual DOM index is `i + 1`.
   * - This is why we use `(targetIndex + 1) * liWidth * -1` for correct positioning.
   */
  var to = (targetIndex + 1) * slideWidth * -1;
  timeBoundAnimation(dom.ul, [{ left: to, duration: 200 }], function () {
    lock = false;
    currentIndex = targetIndex;
    var nextSpan = dom.spans[currentIndex];
    setClassName(currentSpan, nextSpan, "active");
    currentSpan = nextSpan;
  });
});

// prev and next

dom.prev.addEventListener("mouseover", function () {
  stopTimer(intervalId);
});
dom.prev.addEventListener("mouseleave", function () {
  autoPlay(2000);
});

dom.prev.addEventListener("click", function () {
  if (lock) return;
  lock = true; // there's switching happening.
  toPrev();
});

dom.next.addEventListener("mouseover", function () {
  stopTimer(intervalId);
});
dom.next.addEventListener("mouseleave", function () {
  autoPlay(2000);
});
dom.next.addEventListener("click", function () {
  if (lock) return;
  lock = true; // there's switching happening.
  toNext();
});

function toNext() {
  var next = currentIndex + 1;
  // Add 1 because of the cloned slide at the beginning
  var to = (next + 1) * slideWidth * -1;

  timeBoundAnimation(dom.ul, [{ left: to, duration: 200 }], function () {
    lock = false;

    // If we've reached the cloned first slide (at the end)
    if (next >= totalSlides) {
      // Jump to the real first slide (without animation)
      dom.ul.style.left = slideWidth * -1 + "px";
      currentIndex = 0;
    } else {
      currentIndex = next;
    }

    var nextSpan = dom.spans[currentIndex];
    setClassName(currentSpan, nextSpan, "active");
    currentSpan = nextSpan;
  });
}

function toPrev() {
  var prev = currentIndex - 1;
  // Add 1 because of the cloned slide at the beginning
  var to = (prev + 1) * slideWidth * -1;

  timeBoundAnimation(dom.ul, [{ left: to, duration: 200 }], function () {
    lock = false;

    // If we've reached the cloned last slide (at the beginning)
    if (prev < 0) {
      // Jump to the real last slide (without animation)
      dom.ul.style.left = totalSlides * slideWidth * -1 + "px";
      currentIndex = totalSlides - 1;
    } else {
      currentIndex = prev;
    }

    var previousSpan = dom.spans[currentIndex];
    setClassName(currentSpan, previousSpan, "active");
    currentSpan = previousSpan;
  });
}
