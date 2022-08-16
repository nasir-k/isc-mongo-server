const Country = require("../../models/country.model");
const countryRoute = {
  path: "/country",
  method: "GET",
  handler: (req, res) => {
    try {
      const data = Country.find();
      return data;
    } catch (error) {
      return res.response(error).code(500);
    }
  },
};

module.exports = countryRoute;
