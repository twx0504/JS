const urls = [
  "https://picsum.photos/200?random=1",
  "https://picsum.photos/200?random=2",
  "https://picsum.photos/200?random=3",
  "https://picsum.photos/200?random=4",
];

/**
 * A callback-based image loading method
 *
 * @param {string} url - image url
 * @param {Function} resolve - a callback function that is called after the image is successfully loaded.
 * @param {Function} reject - a callback function that is called after the image loading is failed.
 */
function loadImageCB(
  url,
  resolve,
  reject = function (err) {
    console.log(err);
  },
) {
  const img = new Image();
  img.onload = function () {
    resolve(img);
  };
  img.onerror = function () {
    reject(new Error(`Image loading with ${url} has failed`));
  };

  img.src = url;
}

/**
 * A promise-based image loading method
 *
 * @param {string} url - image url
 */
function loadImagePromise(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject(new Error(`Image loading with ${url} has failed`));
    };
    img.src = url;
  });
}

export { urls, loadImageCB, loadImagePromise };
