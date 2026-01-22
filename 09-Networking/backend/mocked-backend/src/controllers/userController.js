const { sendJson } = require("../utils/response");
const users = require("../data/users/users.json");

exports.getUserByID = (req, res) => {
  try {
    const userId = req.params[0]; // First captured group from regex

    // In real app, fetch from database
    const data = users.find((user) => {
      return user.id === userId;
    });

    if (!data) {
      return sendJson(res, 404, {
        status: "error",
        message: "User not found",
      });
    }

    return sendJson(res, 200, data);
  } catch (error) {
    console.error("Error in getUser:", error);
    sendJson(res, 500, {
      status: "error",
      message: "Failed to fetch user",
    });
  }
};

exports.getAllUsers = (_, res) => {
  try {
    return sendJson(res, 200, users);
  } catch (error) {
    console.error("Error in getUser:", error);
    sendJson(res, 500, {
      status: "error",
      message: "Failed to fetch user",
    });
  }
};

// Implement getUserByCredentials / login
