const corsConfig = require("../config/cors");

module.exports = (req, res) => {
  const reqOrigin = req.headers.origin;

  if (corsConfig.allowedOrigins.includes(reqOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", reqOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      corsConfig.allowedHeaders.join(", "),
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
  }

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return true; // Indicate that request was handled
  }

  // Set cookies
  res.setHeader("Set-Cookie", "username=twx0504; SameSite=None; Secure");

  return false; // Continue to next middleware
};
