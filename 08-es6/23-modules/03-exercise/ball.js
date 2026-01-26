import userConfig from "./ball.config.js";

// Default ball settings
const defaultConfig = { color: "green", r: 25, x: 300, y: 300, opacity: 1 };

export default function init() {
  const filteredConfig = {};
  const keys = Object.keys(userConfig);

  // Keep only keys that exist in the default config
  for (const key of keys) {
    if (defaultConfig.hasOwnProperty(key)) {
      filteredConfig[key] = userConfig[key];
    }
  }

  // Merge user config with defaults (user values override defaults)
  const finalConfig = { ...defaultConfig, ...filteredConfig };

  // Create and style the ball element
  const ball = document.createElement("div");
  ball.style.backgroundColor = finalConfig.color;
  ball.style.width = finalConfig.r + "px";
  ball.style.height = finalConfig.r + "px";
  ball.style.borderRadius = "50%";
  ball.style.position = "absolute";
  ball.style.left = finalConfig.x + "px";
  ball.style.top = finalConfig.y + "px";
  ball.style.opacity = finalConfig.opacity;

  // Add the ball to the page
  document.body.appendChild(ball);
}

console.log("Creating ball...");
