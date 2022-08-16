"use strict";
const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const universityRoute = require("./src/routes/university-data/University.route");
// const coursesRoute = require("./src/routes/courses/Courses.route");
// const countryRoute = require("./src/routes/country/Country.route");
const database = require("./src/FT-27/mongodb/index.js");
// const collections = require("./src/FT-27/mongodb/collections/collections");
const {
  userRoute,
  createUserRoute,
} = require("./src/FT-27/routes/users.routes");

mongoose
  .connect("mongodb://localhost:27017/ISC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: "ignore",
      },
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (req, res) => "Hello, world!",
  });
  server.route(createUserRoute);
  server.route(userRoute);
  // server.route(universityRoute);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
