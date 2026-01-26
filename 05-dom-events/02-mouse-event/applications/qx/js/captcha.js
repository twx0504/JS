// generateCaptcha(container)
// captcha html structure is dynamically generated using JS.
// number and letters are generated dynamically.
// - color & token are randomized.
// background-disturbing img is generated dynamically.
// CSS is hard-coded.

var captchaModule = (function () {
  function generateCaptcha(container) {
    // create captcha
    var captcha = document.createElement("div");
    captcha.className = "captcha";
    captcha.style.cssText =
      "position: relative; width: 140px; height: 40px; border: 2px solid red; cursor: pointer;";
    // create captcha code
    var captchaCode = document.createElement("div");
    captchaCode.className = "captcha-code";
    captchaCode.style.cssText =
      "height: 100%; background-color: #ddd; font-size: 32px; font-weight: bold; text-align: center; line-height: 40px; user-select: none;";
    // create captcha bg
    var captchaBg = document.createElement("div");
    captchaBg.className = "captcha-bg";
    captchaBg.style.cssText =
      "position: absolute; top: 0; left: 0; width: 100%; height: 100%;background: url('./assets/captcha/line1.png') no-repeat center / cover";
    updateCaptchaCode(captchaCode, 6);
    // append
    captcha.appendChild(captchaCode);
    captcha.appendChild(captchaBg);
    container.appendChild(captcha);
    // add eventlistener
    captcha.addEventListener("click", _updateCaptcha);
    function _updateCaptcha() {
      updateCaptchaCode(captchaCode);
      updateCaptchaBg(captchaBg);
    }
  }

  function updateCaptchaCode(el, n = 6) {
    // clear code.
    el.innerHTML = "";
    var codes =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var colors = [
      "black",
      "skyblue",
      "orange",
      "tomato",
      "blue",
      "red",
      "green",
    ];

    for (var i = 0; i < n; i++) {
      // create span
      var span = document.createElement("span");
      // create span content
      var codeIndex = Math.floor(Math.random() * codes.length);
      span.textContent = codes[codeIndex];
      var colorIndex = Math.floor(Math.random() * colors.length);
      span.style.color = colors[colorIndex];
      el.appendChild(span);
    }
  }

  function updateCaptchaBg(el) {
    var bgs = [
      "./assets/captcha/line1.png",
      "./assets/captcha/line2.png",
      "./assets/captcha/line3.png",
      "./assets/captcha/line4.png",
    ];
    var bgIndex = Math.floor(Math.random() * bgs.length);
    el.style.background =
      "url('" + bgs[bgIndex] + "') no-repeat center / cover";

    console.log(el);
  }

  // return an object
  return { generateCaptcha: generateCaptcha };
})();

// note: pollution of global scope is inevitable. I think it might be a wise idea to use Object.defineProperty to make it non-writable and non-configurable.