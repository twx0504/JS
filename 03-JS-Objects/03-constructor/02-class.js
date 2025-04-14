// Class: Ball
// properties: radius, color, opacity, x, y
// methods: move, changeColor
// Note: some values must be passed, some values can be set inside constructor!

/**
 * Creates a circle (or another shape) on the DOM with the given properties.
 *
 * @param {number} r - The radius of the shape.
 * @param {string} color - The background color of the shape (e.g., 'red', '#ff0000').
 * @param {number} opacity - The opacity of the shape, ranging from 0 to 1.
 * @param {number} x - The x position of the shape on the screen (in pixels).
 * @param {number} y - The y position of the shape on the screen (in pixels).
 */
function Ball(r, color, opacity, x, y) {
  this.radius = r;
  this.diameter = r * 2;
  this.color = color;
  this.opacity = opacity;
  this.x = x;
  this.y = y;
  // Generally, automatic initialization happens when invoking constructor with new.
  // But if you want the user to init themselves, then you shouldn't call init inside constructor.
  // this.init(); 
  this.init = function () {
    // initialization: put it on the dom.
    // this.dom add a new property dom to the ball instances.
    this.dom = document.createElement("div"); // in memory
    // set styles on div
    this.dom.style.width = this.diameter + "px";
    this.dom.style.height = this.diameter + "px";
    this.dom.style.borderRadius = this.radius + "px";
    this.dom.style.backgroundColor = this.color;
    this.dom.style.opacity = this.opacity;
    this.dom.style.position = "absolute";
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    document.body.appendChild(this.dom); // insert div into dom
  };
  this.move = function () {
    this.dom.style.left = this.x + 250 + "px";
    this.dom.style.top = this.y + 250 + "px";
  };
  this.changeColor = function () {
    this.dom.style.backgroundColor = "skyblue";
  };
}

var pink = new Ball(100, "pink", 0.5, 100, 100);
var blue = new Ball(200, "blue", 0.8, 200, 200);
var green = new Ball(1000, "green", 1, 300, 300);
pink.init();
blue.init();
green.init();

// you can create 1000+ balls with different values based on Math.random()!
