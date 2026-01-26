// Define a phone object: What it has and What it can do
var phone = {
  brand: "Apple",
  size: "5.6",
  color: "Black",
  weight: "100g",
  quality: "Aluminium",
  call: function () {
    console.log("Call");
  },
  playGame: function () {
    console.log("Play");
  },
  "to-Eat"() {
    console.log("Eat what?");
  },
};

console.log(phone);
phone.call();
phone.playGame();
phone["to-Eat"]();

var key = "myName";
var user = {
  [key]: "Too Wei Xin",
  ["age"]: 25,
};

console.log(user.key); // undefined - key is not the property of user! It is just a variable.
console.log(user[key]); // use [key] to access
console.log(user.myName); // Too Wei Xin - this is working by using the name in that variable.
console.log(user.age);





