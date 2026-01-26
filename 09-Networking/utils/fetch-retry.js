/**
 * send request
 * @param {string} url request url
 * @param {number} maxCount max retry count
 *
 * @returns {Promise} promise
 */
async function fetchWithRetry(url, maxCount = 5) {
  try {
    return await fetch(url);
  } catch (err) {
    return await (maxCount <= 0
      ? Promise.reject(err)
      : fetchWithRetry(url, maxCount - 1));
  }
}
