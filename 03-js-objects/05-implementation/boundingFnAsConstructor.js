function Position(x, y, z) {
  // this refers to instance of Position
  this.x = x;
  this.y = y;
  this.z = z;
}

Position.prototype.getPosition = function () {
  console.log(this);
  console.log("Position: ", this.x, this.y);
};

/* when the bounding function is used as a constructor, the context is ignored. */
/* new BoundingFN() is similar to new Position() */
/* It is only used for setting preset parameters in this case. */
var Fn = Position.bind([1, 2, 3], 4, 5);
var position1 = new Fn(3); // passing 3 for z parameter.
console.log(position1); // Position { x: 4, y: 5 }

position1.getPosition();
console.log(position1 instanceof Position); // true

// However, Fn !== Position
console.log(Fn === Position); // false

function Person(name, age) {
  // Generally, we do not write return inside constructor.
  // it is ok if we return a primitive, it still return the instance.
  // However, if you return an object / new Object(primitive) it will return what you specify on the return statement!
  this.name = name;
  this.age = age;
  /* Try to uncomment each one to see what happens! */
  //   return 1;
  //   return new Object(1);
  //   return [1, 2, 3];
  //   return { a: 1, b: 2 };
}

var p1 = new Person("wx", 25);
console.log(p1);
