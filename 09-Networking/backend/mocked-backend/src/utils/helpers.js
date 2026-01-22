function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSearchSuggestions(keyword) {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i),
  );

  const dataCount = randomize(3, 5);

  return new Array(dataCount).fill(0).map(() => {
    let loopCount = randomize(5, 15);
    let str = keyword;

    while (loopCount > 0) {
      const alphabetIndex = randomize(0, 25);
      str += alphabet[alphabetIndex];
      loopCount--;
    }

    return { keyword: str };
  });
}

module.exports = {
  randomize,
  generateSearchSuggestions,
};
