const Courses = require("../../models/courses.model");
const countryRoute = {
  path: "/courses",
  method: "GET",
  handler: (req, res) => {
    try {
      const data = Courses.find();
      return data;
    } catch (error) {
      return res.response(error).code(500);
    }
  },
};

module.exports = countryRoute;
