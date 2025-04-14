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

console.log(phone["to-Eat"]); // fn
phone["to-Eat"]();
phone.call();
