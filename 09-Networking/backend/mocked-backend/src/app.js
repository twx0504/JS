const http = require("http");
const router = require("./routes/router");
const corsMiddleware = require("./middleware/cors");
const logger = require("./middleware/logger");
const { sendJson } = require("./utils/response");

const server = http.createServer((req, res) => {
  try {
    // Apply logger middleware
    logger(req, res);

    // Apply CORS middleware
    const corsResult = corsMiddleware(req, res);
    if (corsResult) return; // Handled OPTIONS request

    // Route the request
    router(req, res);
  } catch (error) {
    console.error("Server Error:", error);

    sendJson(res, 500, {
      status: "error",
      message: "Internal Server Error",
    });
  }
});

module.exports = server;
