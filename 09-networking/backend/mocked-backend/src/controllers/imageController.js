const fs = require("fs");
const path = require("path");
const { sendJson } = require("../utils/response");

exports.getImage = (_, res) => {
  try {
    const imagePath = path.join(__dirname, "../../assets/img.jpg");
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return sendJson(res, 404, {
        status: "error",
        message: "Image not found",
      });
    }

    const img = fs.readFileSync(imagePath);
    const stat = fs.statSync(imagePath);

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": stat.size,
    });

    res.end(img);
  } catch (error) {
    console.error("Error in getImage:", error);
    sendJson(res, 500, {
      status: "error",
      message: "Failed to load image",
    });
  }
};
