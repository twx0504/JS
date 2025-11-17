const minObj = {
  a: data.max,
  b: data.min,
  min() {
    return this.a > this.b ? this.b : this.a;
  },
};
