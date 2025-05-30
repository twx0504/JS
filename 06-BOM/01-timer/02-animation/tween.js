var Tween = {
  // Constant velocity motion formula
  Linear: function (t, b, c, d) {
    return (t / d) * c + b;
  },
  // Exponentially decaying bounce easing
  Bounce: {
    easeIn: function (t, b, c, d) {
      return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut: function (t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    easeInOut: function (t, b, c, d) {
      if (t < d / 2) {
        return Tween.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
      }
      return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    },
  },
  // Quadratic easing
  Quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t + b;
      }
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
  },
  // Cubic easing
  Cubic: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t * t + b;
      }
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },
  },
  // Quartic easing
  Quart: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t * t * t + b;
      }
      return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
    },
  },
  // Quintic easing
  Quint: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t * t * t * t + b;
      }
      return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
  },
  // Sine wave easing
  Sine: {
    easeIn: function (t, b, c, d) {
      return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sin((t / d) * (Math.PI / 2)) + b;
    },
    easeInOut: function (t, b, c, d) {
      return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
    },
  },
  // Exponential easing
  Expo: {
    easeIn: function (t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  },
  // Circular easing
  Circ: {
    easeIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
      }
      return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
  },
};
