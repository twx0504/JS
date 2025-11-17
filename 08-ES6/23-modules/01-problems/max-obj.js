const maxObj = {
  a: data.max,
  b: data.min,
  max() {
    return this.a > this.b ? this.a : this.b;
  },
};
