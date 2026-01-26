class MyPromise {
  #state = "pending";
  #result = undefined;
  static #isPromise(p) {
    return p instanceof MyPromise;
  }

  static #isThenable(p) {
    return p !== null && typeof p === "object" && typeof p.then === "function";
  }

  #isFulfilled() {
    return this.#state === "fulfilled";
  }
  #isRejected() {
    return this.#state === "rejected";
  }
  #isPending() {
    return this.#state === "pending";
  }
  constructor(executor) {
    // Note: be aware of this inside function.
    // - arrow function uses outer this.
    // - regular function has different this. You need to pass outer this inside function.
    const resolve = (data) => {
      // only change state when the state is pending.
      if (this.#isPending()) {
        this.#state = "fulfilled";
        this.#result = data;
      }
    };
    const reject = (reason) => {
      // only change state when the state is pending.
      if (this.#isPending()) {
        this.#state = "rejected";
        this.#result = reason;
        // There is similar mechanism like throwing error.
        //   throw new Error(`Uncaught (in promise) ${reason}`);
      }
    };
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const timerId = setInterval(() => {
        if (this.#isFulfilled()) {
          const p = onFulfilled(this.#result);
          // if p is a promise instance or thenable object.
          if (MyPromise.#isPromise(p) || MyPromise.#isThenable(p)) {
            p.then(resolve, reject);
            // if p is a promise, we cannot directly resolve, we need to wait until the promise to fulfill.
            // it is similar to p.then((data)=>{},(err)=>{}) where resolve and reject are function references, and both receive one argument.;
          } else {
            resolve(p);
          }
          clearInterval(timerId);
        } else if (this.#isRejected()) {
          const p = onRejected(this.#result);
          if (p instanceof MyPromise) {
            p.then(resolve, reject);
          } else {
            reject(p);
          }
          clearInterval(timerId);
        }
      }, 50);
    });
  }

  static resolve(val) {
    // val is promise instance.
    if (MyPromise.#isPromise(val)) return val;
    // val is thenable object.
    if (MyPromise.#isThenable(val)) {
      console.log("val is thenable: ", val);
      return new MyPromise((resolve, reject) => {
        val.then(resolve, reject);
      });
    }
    // val is plain value.
    return new MyPromise((resolve) => resolve(val));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
