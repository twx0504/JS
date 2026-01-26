/**
 * Determine the browser name from the user agent string, checking for the browser core.
 * Nowadays, most browsers are based on Chromium core.
 * Firefox is the only major browser that is not based on Chromium.
 *
 * @param {string} userAgent
 * @returns
 */
function getBrowserName() {
  var userAgent = window.navigator.userAgent;
  // The order matters here, and this may report false positives for unlisted browsers.
  if (contains(userAgent, "Firefox")) {
    // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    return "Mozilla Firefox";
  } else if (contains(userAgent, "SamsungBrowser")) {
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
    return "Samsung Internet";
  } else if (contains(userAgent, "Opera") || contains(userAgent, "OPR")) {
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
    return "Opera";
  } else if (contains(userAgent, "Edg")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
    return "Microsoft Edge (Chromium)";
  } else if (contains(userAgent, "Edge")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    return "Microsoft Edge (Legacy)";
  } else if (contains(userAgent, "Chrome")) {
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    return "Google Chrome or Chromium";
  } else if (contains(userAgent, "Safari")) {
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
    return "Apple Safari";
  } else {
    return "unknown";
  }
}

function contains(str, search) {
  if (typeof String.prototype.includes === "function") {
    // support includes
    return str.includes(search);
  } else {
    // do not support includes
    return str.indexOf(search) > -1;
  }
}

var isWechat = function () {
  var userAgent = window.navigator.userAgent.toLowerCase();
  if (contains(userAgent, "micromesseger")) return true;
  return false;
};

function getDevice() {
  var userAgent = window.navigator.userAgent;
  // i: case insensitive
  // (): only one match
  if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
    return "iOS";
  } else if (/(Android)/i.test(userAgent)) {
    return "Android";
  }
  return "Web";
}
