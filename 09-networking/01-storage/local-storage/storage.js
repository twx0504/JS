export default {
  get(key) {
    const value = localStorage.getItem(key);
    try {
      // JSON.parse requires value to follow the JSON rules
      // e.g., JSON.parse("undefined"), JSON.parse("a") throw exception
      return JSON.parse(value);
    } catch {
      return value;
    }
  },
  set(key, value) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
