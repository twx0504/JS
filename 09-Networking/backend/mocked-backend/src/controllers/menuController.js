const { sendJson } = require("../utils/response");
const menuLevelOne = require("../data/menu/menuLevelOne.json");
const menuLevelTwo = require("../data/menu/menuLevelTwo.json");

exports.getMenuLevelOne = (_, res) => {
  try {
    sendJson(res, 200, menuLevelOne);
  } catch (error) {
    console.error("Error in getMenuLevelOne:", error);
    sendJson(res, 500, {
      status: "error",
      message: "Failed to fetch level-one menu",
    });
  }
};

exports.getMenuLevelTwo = (req, res) => {
  try {
    const categoryId = req.params[0]; // First captured group from regex
    const data = menuLevelTwo[categoryId] || [];
    sendJson(res, 200, data);
  } catch (error) {
    console.error("Error in getMenuLevelTwo:", error);
    sendJson(res, 500, {
      status: "error",
      message: "Failed to fetch level-two menu",
    });
  }
};
