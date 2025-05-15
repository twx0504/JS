(function () {
  // 1. Data
  var prizeList = [
    "Sorry", // Most common
    "$50", // Very common
    "$100", // Common
    "$200", // Uncommon
    "$300", // Uncommon
    "$500", // Rare
    "$1000", // Very rare
    "$5000", // Extremely rare
  ];

  var prizeWeights = [
    40, // "Sorry"
    25, // "$50"
    15, // "$100"
    7, // "$200"
    5, // "$300"
    4, // "$500"
    3, // "$1000"
    1, // GRAND PRIZE: $5000
  ];

  var totalPrizes = prizeList.length;

  var spans = document.querySelectorAll(".prize-item span");
  spans.forEach(function (el, i) {
    el.textContent = prizeList[i];
  });

  // 2. Draw

  var prize;
  var luckyBtn = document.querySelector(".lucky-btn");
  var luckyPanel = document.querySelector(".lucky-panel");
  var lock = false;

  var draw = createDraw();

  luckyBtn.addEventListener("click", draw);
  luckyPanel.addEventListener("transitionend", function () {
    alert(prize);
    lock = false;
  });
  /*
        index
        0 -> 22.5deg
        1 -> 45 + 22.5deg
        2 -> 45 + 45 + 22.5deg

        n * 45 + 22.5
      */
  function createDraw() {
    var config = {
      sum: 0, // Tracks the total number of degrees the wheel has spun after multiple rotations.
      turns: 5, // Defines how many full rotations the wheel will make before stopping.
      initialAngle: 22.5, // The initial angle from which the wheel will start spinning. This creates a slight offset, making the wheel not start from exactly 0 degrees.
      anglePerSegment: 45, // The angle for each segment on the wheel. Since there are 8 segments, the angle per segment is 45 degrees (360 degrees / 8 segments).
    };
    return function () {
      if (lock) return;
      lock = true;
      var drawResult = weightedRandomDraw(prizeList, prizeWeights);
      console.log(drawResult);
      spin(luckyPanel, drawResult, config);
      prize = drawResult.prize;
    };
  }

  function spin(el, drawResult, config) {
    var index = drawResult.index;
    config.sum += config.turns * 360;
    var targetAngle =
      index * config.anglePerSegment + config.initialAngle + config.sum;
    el.style.transform = "rotate(" + targetAngle + "deg)";
  }

  function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function weightedRandomDraw(p, w) {
    var totalPrize = p.length;
    var totalWeight = w.length;
    var sumOfWeight = 0;
    w.forEach(function (item) {
      sumOfWeight += item;
    });
    var targetWeight = getRandom(0, sumOfWeight);
    var accumulatedWeight = 0;
    for (var i = 0; i < totalPrize; i++) {
      accumulatedWeight += w[i];
      if (accumulatedWeight >= targetWeight) {
        return { prize: p[i], index: i };
      }
    }
  }

  // console.log(weightedRandomDraw(prizeList, prizeWeights));
  // Check probability for prizeList and prizeWeights

  function showProbability() {
    var prob = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < 1000; i++) {
      var prize = weightedRandomDraw(prizeList, prizeWeights).prize;
      switch (prize) {
        case "Sorry":
          prob[0]++;
          break;
        case "$50":
          prob[1]++;
          break;
        case "$100":
          prob[2]++;
          break;
        case "$200":
          prob[3]++;
          break;
        case "$300":
          prob[4]++;
          break;
        case "$500":
          prob[5]++;
          break;
        case "$1000":
          prob[6]++;
          break;
        case "$5000":
          prob[7]++;
          break;
      }
    }
    return prob;
  }

  console.log(showProbability());
})();
