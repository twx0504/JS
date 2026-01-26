const data = {
  max: 10,
  min: 1,
};

function min() {
  return data.max > data.min ? data.min : data.max;
}

function max() {
  return data.max > data.min ? data.max : data.min;
}
