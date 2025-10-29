const p1 = Promise.resolve().then(() => {
  // then a
  console.log("then a:", 0);
  return Promise.resolve(4);

  //   UNDER THE HOOD: It perform then on promise returned by Promise.resolve(4):
  // return new Promise((resolve, reject) => {
  //   Promise.resolve(4)
  //     .then(=(data) => {
  //       // HIDDEN - this is a hidden then method we have to consider.
  //       console.log("HIDDEN: NONE");
  //       resolve(data);
  //       //   console.log(p1);
  //     })
  //     .catch((err) => {
  //       reject(err);
  //     });
  // });
});

const p2 = p1.then((data) => {
  // then b - It looks like this callback occurs after then 3.
  // Based on my analysis: it is occurs before then 3.
  console.log("then b:", data);
});

Promise.resolve()
  .then(() => {
    // then 1
    console.log("then 1:", 1);
  })
  .then(() => {
    // then 2
    console.log("then 2:", 2);
  })
  .then(() => {
    // then 3
    console.log("then 3:", 3);
  })
  .then(() => {
    // then 4
    console.log("then 5:", 5);
  })
  .then(() => {
    // then 5
    console.log("then 6:", 6);
  });
