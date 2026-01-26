const url = require("url");
const userController = require("../controllers/userController");
const searchController = require("../controllers/searchController");
const imageController = require("../controllers/imageController");
const menuController = require("../controllers/menuController");
const { sendJson } = require("../utils/response");

// Simple router: maps URL patterns to controllers
const routes = [
  {
    method: "GET",
    pattern: /^\/$/,
    handler: (_, res) => {
      sendJson(res, 200, { connection: "successful" });
    },
  },
  {
    method: "GET",
    pattern:
      /^\/api\/users\/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}|\d+)$/,
    handler: userController.getUserByID,
  },
  {
    method: "GET",
    pattern: /^\/api\/users/,
    handler: userController.getAllUsers,
  },
  {
    method: "GET",
    pattern: /^\/api\/suggestions\/search$/,
    handler: searchController.searchSuggestions,
  },
  {
    method: "GET",
    pattern: /^\/api\/courses\/search$/,
    handler: searchController.getCoursesByKeyword,
  },
  {
    method: "GET",
    pattern: /^\/api\/courses$/,
    handler: searchController.getAllCourses,
  },
  {
    method: "GET",
    pattern: /^\/api\/menu\/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}|\d+)$/,
    handler: menuController.getMenuLevelTwo,
  },
  {
    method: "GET",
    pattern: /^\/api\/menu$/,
    handler: menuController.getMenuLevelOne,
  },
  {
    method: "POST",
    pattern: /^\/api\/image$/,
    handler: imageController.getImage,
  },
];

module.exports = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Find matching route
  for (const route of routes) {
    if (req.method === route.method) {
      const match = pathname.match(route.pattern);
      if (match) {
        // Add parsed URL and params to request
        req.parsedUrl = parsedUrl;
        req.params = match.slice(1); // Extract captured groups if there's any
        // Call the handler
        route.handler(req, res);
        return;
      }
    }
  }

  // 404 Not Found
  sendJson(res, 404, {
    status: "error",
    message: "Route not found",
  });
};
