const m = Symbol("m");
export default class Person {
  constructor(name) {
    this.name = name;
    this[m] = name;
  }
  getM() {
    return this[m];
  }
}
