/**
 * Sleep for a specified amount of miliseconds
 * @param {number} time - sleep time
 * @returns
 */
export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
