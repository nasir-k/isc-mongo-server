const { database, createAddress, createUser } = require("../mongodb/index.js");

const userRoute = {
  path: "/ft-27-mongodb/user",
  method: "GET",
  handler: async (req, res) => {
    try {
      const country = req.query.country || "Spain";
      const pageNumber = req.query.pageNumber || 1;
      const pageSize = req.query.pageSize || 10;
      console.log(country, pageNumber, pageSize);
      const result = await database
        .collection("users")
        .aggregate([
          {
            $lookup: {
              from: "addresses",
              localField: "_id",
              foreignField: "userId",
              as: "address",
            },
          },
          {
            $match: {
              "address.country": { $regex: country, $options: "i" },
            },
          },
          {
            $sort: {
              name: 1,
            },
          },
          {
            $limit: pageSize,
          },
          {
            $skip: (pageNumber - 1) * pageSize,
          },
        ])
        .toArray();
      return res.response(result);
    } catch (error) {
      return res.response(error);
    }
  },
};

const createUserRoute = {
  path: "/ft-27-mongodb/user",
  method: "POST",
  handler: async (req, res) => {
    try {
      const user = req.payload.user || "";
      const address = req.payload.address || "";
      const userResult = await createUser(user);
      address.userId = result.insertedId;
      const addressResult = await createAddress(address);
      return res.response({
        message: "User created successfully",
        addressResult,
        userResult,
      });
    } catch (error) {
      return res.response({
        message: "User creation failed",
        error,
      });
    }
  },
};

module.exports = {
  userRoute,
  createUserRoute,
};
