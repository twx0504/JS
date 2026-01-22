const { sendJson } = require("../utils/response");
const { generateSearchSuggestions } = require("../utils/helpers");
const courses = require("../data/courses/courses.json");

exports.searchSuggestions = (req, res) => {
  try {
    const keyword = req.parsedUrl.query.keyword;

    if (!keyword) {
      return sendJson(res, 400, {
        status: "error",
        message: "Keyword is required",
      });
    }

    const data = generateSearchSuggestions(keyword);

    sendJson(res, 200, data);
  } catch (error) {
    console.error("Error in search:", error);
    sendJson(res, 500, {
      status: "error",
      message: "Search failed",
    });
  }
};

exports.getCoursesByKeyword = (req, res) => {
  try {
    // Decode to handle potential non-English keyword
    const keyword = decodeURIComponent(
      req.parsedUrl.query.keyword,
    ).toLowerCase();

    if (!keyword) {
      return sendJson(res, 400, {
        status: "error",
        message: "Keyword is required",
      });
    }

    const filteredCourses = courses.filter((course) => {
      // Case-insensitive search
      const courseName = course.courseName.toLowerCase();
      return courseName.includes(keyword);
    });

    sendJson(res, 200, filteredCourses);
  } catch (e) {
    console.log(e);
  }
};

exports.getAllCourses = (_, res) => {
  try {
    sendJson(res, 200, courses);
  } catch (e) {
    console.log(e);
  }
};
