(function () {
  /**
   * Red packet constructor - equivalent to class
   * @param {number} prize prize money
   * @param {number} x x position
   * @param {number} y y position
   * @param {number} angle rotation angle
   * @param {number} width width of red packet
   * @param {number} height height of red packet
   */
  function RedPacket(prize = 0, x, y, angle, width = 128, height = 168) {
    this.prize = prize < 0 ? 0 : prize; // Make sure prize is positive.
    this.width = width <= 0 ? 0 : width;
    this.height = height <= 0 ? 0 : height;
    this.y = (function (that) {
      if (typeof y === "number" && !Number.isNaN(y)) {
        return y;
      }
      return -that.height;
    })(this);
    this.x = (function (that) {
      var min = that.width;
      var max = document.body.clientWidth - min;
      // when user supplies x, assume user knows what they are doing.
      if (typeof x === "number" && !Number.isNaN(x)) {
        return x;
      }
      return _getRandom(min, max);
    })(this);
    this.angle = (function () {
      if (typeof angle === "number" && !Number.isNaN(angle)) {
        return angle;
      }
      return _getRandom(-45, 45);
    })();
    this.duration = _getRandom(3, 7);
    function _getRandom(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }
    this.init();
  }

  RedPacket.prototype.container = document.getElementById("js-container");
  var container = RedPacket.prototype.container;
  RedPacket.prototype.domShowRedPacket =
    container.querySelector(".show-red-packet");
  RedPacket.prototype.domPrize = container.querySelector(".prize");
  RedPacket.prototype.domCloseBtn = container.querySelector(".close");
  var closeBtn = RedPacket.prototype.domCloseBtn;
  RedPacket.prototype.domMask = container.querySelector(".mask");

  RedPacket.prototype.init = function () {
    this.dom = document.createElement("div");
    this.dom.classList.add("red-packet");
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    this.dom.style.transform = "rotate(" + this.angle + "deg)";
    this.container.appendChild(this.dom);
    this.dom.that = this;
  };

  RedPacket.prototype.drop = function () {
    this.dom.classList.add("animation-drop");
    this.dom.style.animationDuration = this.duration + "s";
    var that = this; // store redpacket instance in that.
    // optimisation: remove redpacket once the animation ends.
    this.dom.addEventListener("animationend", function () {
      // this refers to this.dom
      // not the redpacket instance!
      that.container.removeChild(this);
    });
  };

  // Static Method
  RedPacket.showRedPacket = function (context) {
    context.domShowRedPacket.style.display = "block";
    context.domMask.style.display = "block";
    context.domPrize.textContent = context.prize;
  };
  
  RedPacket.hideRedPacket = function (context) {
    context.domShowRedPacket.style.display = "none";
    context.domMask.style.display = "none";
  };

  // [min, max)
  function getRandomPrize(min, max) {
    return Number((min + Math.random() * (max - min)).toFixed(2));
  }

  var prizeList = [];
  var sum = 0;
  for (var i = 0; i < 50; i++) {
    var random = getRandomPrize(0, 5);
    sum += random;
    prizeList.push(random);
  }

  var timer = setInterval(function () {
    var redpacket = new RedPacket(prizeList.pop());
    redpacket.drop();
    if (prizeList.length === 0) {
      clearInterval(timer);
    }
  }, 200);

  var currentRedPacket = null; // use to store the clicked red packet instance.
  // Event Delegation
  container.addEventListener("click", function (e) {
    var target = e.target;
    if (!target.classList.contains("red-packet")) return;
    currentRedPacket = target.that;
    RedPacket.showRedPacket(currentRedPacket);
  });

  closeBtn.addEventListener("click", function (e) {
    if (currentRedPacket) {
      RedPacket.hideRedPacket(currentRedPacket);
    }
  });
})();
