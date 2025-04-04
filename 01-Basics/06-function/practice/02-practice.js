function sum() {
  var total = 0;
  var str = "";
  if (arguments.length === 1) {
    str += "0+" + arguments[0] + "=" + arguments[0];
  } else {
    for (var i = 0; i < arguments.length; i++) {
      total += arguments[i];
      if (i === arguments.length - 1) {
        str += arguments[i] + "=" + total;
      } else {
        str += arguments[i] + "+";
      }
    }
  }
  console.log(str);
}

function sum() {
  var total = 0;
  var str = "";
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
    if (arguments.length === 1) {
      str += "0+" + arguments[0] + "=" + arguments[0];
    } else if (i === arguments.length - 1) {
      str += arguments[i] + "=" + total;
    } else {
      str += arguments[i] + "+";
    }
  }
  console.log(str);
}

sum(1);
sum(1, 2);
sum(1, 2, 3);
sum(1, 2, 3, 6, 7, 9, 10, 20);



// product is the same logic:
function product() {
    var total = 1;
    var str = "";
    for (var i = 0; i < arguments.length; i++) {
      total *= arguments[i];
      if (arguments.length === 1) {
        str += "1*" + arguments[0] + "=" + arguments[0];
      } else if (i === arguments.length - 1) {
        str += arguments[i] + "=" + total;
      } else {
        str += arguments[i] + "*";
      }
    }
    console.log(str);
  }
  
  product(1);
  product(1, 2);
  product(1, 2, 3);
  product(1, 2, 3, 6, 7, 9, 10, 20);
  