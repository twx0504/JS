/**
 * Linear motion.
 * @param {HTMLElement} el
 * @param {number} step
 * @param {number} target
 * @param {function} callback
 * @param {number} delay
 */
function move(el, step, target, callback, delay = 20) {
  clearInterval(el.timer);
  if (target < el.offsetLeft) {
    step = -step;
  }
  el.timer = setInterval(function () {
    var currentLeft = el.offsetLeft + step;
    if (
      (currentLeft >= target && step > 0) ||
      (currentLeft <= target && step < 0)
    ) {
      currentLeft = target;
      clearInterval(el.timer);
      el.timer = null;
      typeof callback === "function" && callback();
    }
    el.style.left = currentLeft + "px";
  }, delay);
}

function resetMove(el, initialLeft = 0) {
  if (el.timer) {
    clearInterval(el.timer);
    el.timer = null;
  }
  el.style.left = initialLeft + "px";
}

/**
 * Decelerated Motion
 * @param {HTMLElement} el
 * @param {number} target
 * @param {function} callback
 * @param {number} delay
 */
function deceleratedMotion(el, target, callback, delay = 50) {
  clearInterval(el.timer);
  el.timer = setInterval(function () {
    var speed = (target - el.offsetLeft) / 20;

    // if speed > 0, we round up, ensuring at least moving by 1px.
    // if speed <= 0, we round down， ensuring at least moving by -1px.
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    var currentPosition = el.offsetLeft + speed;

    // update the style
    el.style.left = currentPosition + "px";
    // check if the target has been reached
    if (currentPosition === target) {
      clearInterval(el.timer);
      el.timer = null;
      typeof callback === "function" && callback();
    }
  }, delay);
}

// target = { left: 600, top: 300 }
// When should we clear timer? When all values reaches target.
// Assume all styles have reached target. var allDone = true;
// Note: Some CSS properties do not have units and requires separate handling.

/**
 * Animate multiple styles in decelerated motion.
 * @param {HTMLElement} el An HTML element
 * @param {object} target An object { prop1: value1, prop2: value2 }
 * @param {function} onComplete A callback that will execute at the end of the motion.
 * @param {number} interval Interval, default to 60
 *
 * TODO: use str.replace(search, function(match, offset, fullstring){}) to store unit.
 */
function moves(el, target, onComplete, interval = 60) {
  clearInterval(el.timer);
  el.timer = setInterval(function () {
    // assume all styles have reached the target.
    var allDone = true;
    // traverse the target, get the key and its corresponding target value.
    // assume: key = top
    var computedStyles = getComputedStyle(el);
    for (var key in target) {
      if (key.toLowerCase() === "opacity") {
        previousValue = computedStyles[key] * 100;
      } else {
        var previousValue = parseInt(computedStyles[key]);
      }
      var targetValue = parseInt(target[key]);
      var step = (targetValue - previousValue) / 20;
      // if step > 0, we round up, ensuring at least moving by 1px.
      // if step <= 0, we round down， ensuring at least moving by -1px.
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      var nextValue = previousValue + step;

      // update the style
      if (key.toLowerCase() === "opacity") {
        console.log(nextValue, previousValue);
        el.style[key] = nextValue / 100;
      } else {
        el.style[key] = nextValue + "px";
      }

      // check if the target has been reached
      if (nextValue !== targetValue) {
        allDone = false;
      }
    }
    // When styles reach target.
    if (allDone) {
      clearInterval(el.timer);
      el.timer = null;
      typeof onComplete === "function" && onComplete();
    }
  }, interval);
}

/**
 * Animates multiple CSS style properties of an element over time using easing functions.
 *
 * Each animation step smoothly transitions a style property from its current computed value
 * to the specified target value over a defined duration. Multiple properties can be animated,
 * each with its own duration, and the entire animation runs in sync based on the longest duration.
 *
 * @param {HTMLElement} el - The DOM element to animate.
 * @param {Array<Object>} target - An array of objects, each specifying target style properties and a duration.
 *   - Each object can include multiple style properties (e.g., `left`, `top`, `width`) and a `duration` in milliseconds.
 *   - Example:
 *     [
 *       { left: 400, top: 300, duration: 3000 },
 *       { width: 300, duration: 5000 }
 *     ]
 * @param {Function} onComplete - A callback function to be executed once all animations are finished.
 * @param {Function} [easingFn] - Optional easing function. Defaults to linear interpolation: `(t, b, c, d) => (t / d) * c + b`.
 *   - Parameters:
 *     - `t`: Current time
 *     - `b`: Begin value
 *     - `c`: Change in value
 *     - `d`: Duration
 * @param {number} [frameRate=16] - Optional frame interval in milliseconds (default is ~60fps).
 */
function timeBoundAnimation(
  el,
  target = [],
  onComplete,
  easingFn = function (t, b, c, d) {
    return (t / d) * c + b;
  },
  frameRate = 16
) {
  var time = 0;
  var duration = getMaxDuration(target);
  var processedTarget = normalize(target);
  var initialStates = getInitialState(el, processedTarget);
  clearInterval(el.timer);
  el.timer = setInterval(function () {
    time += frameRate;
    var len = processedTarget.length;
    for (var i = 0; i < len; i++) {
      var styleItem = processedTarget[i];
      var key = styleItem.prop;
      var begin = initialStates[i][key];
      var targetValue = styleItem.to;
      var change = targetValue - begin;
      var styleDuration = styleItem.duration || duration;
      var currentPosition = easingFn(time, begin, change, styleDuration); // time / styleDuration causes the value to change over time.
      if (time >= styleDuration) {
        currentPosition = targetValue;
      }
      el.style[key] = currentPosition + "px";
    }
    if (time >= duration) {
      clearInterval(el.timer);
      typeof onComplete === "function" && onComplete();
    }
  }, frameRate);

  /**
   * Gets the maximum duration from the target properties to synchronize the animations.
   *
   * @param {Array} target - The target properties array.
   * @returns {number} - The maximum duration.
   */
  function getMaxDuration(target) {
    var maxDuration = target[0].duration;
    target.forEach(function (item) {
      if (maxDuration < item.duration) {
        maxDuration = item.duration;
      }
    });
    return maxDuration;
  }

  /**
   * Normalizes the target array by converting it into an array of objects with properties: `prop`, `to`, and `duration`.
   * This function processes an array of property-value pairs with durations and flattens them into individual objects for each property to animate.
   *
   * @param {Array} target - The target properties array. Each item in the array can have multiple properties (e.g., `left`, `top`, etc.) and a common `duration` for all properties in that item.
   * @returns {Array} - The normalized array with `prop`, `to`, and `duration` for each property.
   *
   * @example
   * const target = [
   *   { left: 400, top: 300, duration: 3000 },
   *   { width: 300, duration: 5000 },
   *   { height: 300, duration: 5000 }
   * ];
   *
   * const normalizedTarget = normalize(target);
   * console.log(normalizedTarget);
   * Output:
   * [
   *   { prop: "left", to: 400, duration: 3000 },
   *   { prop: "top", to: 300, duration: 3000 },
   *   { prop: "width", to: 300, duration: 5000 },
   *   { prop: "height", to: 300, duration: 5000 }
   * ]
   */
  function normalize(target) {
    var res = [];
    target.forEach(function (item) {
      for (var key in item) {
        if (key !== "duration") {
          res.push({
            prop: key,
            to: item[key],
            duration: item.duration,
          });
        }
      }
    });
    return res;
  }

  /**
   * Retrieves the initial computed style values of the element for the properties to animate.
   * Reduces the operation of getComputedStyle to only once.
   * @param {HTMLElement} el - The DOM element.
   * @param {Array} processed - The processed target array with properties to animate.
   * @returns {Array} - The initial states of the properties.
   */
  function getInitialState(el, processed) {
    var state = [];
    var computedStyle = getComputedStyle(el);
    processed.forEach(function (item) {
      state.push({
        [item.prop]: parseFloat(computedStyle[item.prop]),
      });
    });
    return state;
  }
}

/**
 * Performs advanced animations on the given element by transitioning its properties over time.
 * The function interpolates between the initial and target values of the specified CSS properties
 * and updates the element's style based on a specified duration for each animation.
 *
 * @param {HTMLElement} el - The HTML element to animate.
 * @param {Object[]} animations - An array of animation objects, each containing CSS properties
 *                                (e.g., `left`, `top`, `opacity`) and their corresponding target values
 *                                along with a `duration` in milliseconds.
 * @param {Function} [callback] - Optional callback function to be executed once the animation is complete.
 */
function advancedAnimation(el, animations, callback) {
  var startTime = Date.now(); // record when the animation starts

  // Store all animation states (duration, properties, initial/target values, units)
  var animationStates = [];

  for (var i = 0; i < animations.length; i++) {
    var anim = animations[i];
    var state = { duration: anim.duration, props: {} };

    for (var key in anim) {
      if (key === "duration") continue;

      var computed = getComputedStyle(el)[key];
      var parsed = parseStyleValue(computed);
      var initial = parsed[0];
      var unit = parsed[1];

      var target = anim[key];
      var targetValue =
        typeof target === "number" ? target : parseFloat(target);

      state.props[key] = {
        initial: initial,
        target: targetValue,
        unit: unit,
      };
    }

    animationStates.push(state);
  }

  // Helper to separate number and unit from a string like "100px"
  function parseStyleValue(value) {
    var number = "";
    var unit = "";
    var hasDot = false;
    var i;

    for (i = 0; i < value.length; i++) {
      var char = value[i];
      if ((char >= "0" && char <= "9") || (char === "-" && i === 0)) {
        number += char;
      } else if (char === "." && !hasDot) {
        number += ".";
        hasDot = true;
      } else {
        break;
      }
    }

    unit = value.slice(i).trim(); // the rest is unit
    return [parseFloat(number), unit];
  }

  // Use setInterval to update at ~60fps (every 16ms)
  var intervalId = setInterval(function () {
    var elapsed = Date.now() - startTime;
    var allComplete = true;

    for (var i = 0; i < animationStates.length; i++) {
      var animState = animationStates[i];
      var progress = elapsed / animState.duration;
      if (progress > 1) progress = 1;

      for (var key in animState.props) {
        var prop = animState.props[key];
        var current = prop.initial + (prop.target - prop.initial) * progress;

        if (progress >= 1) {
          current = prop.target; // lock final value
        }

        if (key === "opacity") {
          if (current < 0) current = 0;
          if (current > 1) current = 1;
        }

        el.style[key] = current + prop.unit;
      }

      if (progress < 1) {
        allComplete = false;
      }
    }

    if (allComplete) {
      clearInterval(intervalId); // stop the interval
      if (typeof callback === "function") callback();
    }
  }, 16); // roughly 60 frames per second
}
