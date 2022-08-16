const { faker } = require("@faker-js/faker");
const mongodb = require("mongodb");

const { database } = require("../index");

const collections = async () => {
  try {
    const users = [];
    const addresses = [];
    for (let i = 0; i < 100; i += 1) {
      const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: Math.floor(Math.random() * 30) + 18,
        photo: faker.image.avatar(),
        gender: Math.floor(Math.random() * 2) == 1 ? "female" : "male",
        phone: faker.phone.number(),
      };
      users.push(user);
      const address = {
        street: faker.address.streetAddress(),
        country: faker.address.country(),
      };

      addresses.push(address);
    }

    const userInsertedResult = await database
      .collection("users")
      .insertMany(users);
    const userIds = [];
    userIds.push(userInsertedResult.insertedIds);
    console.log(userIds);
    for (let i = 0; i < addresses.length; i++) {
      addresses[i].userId = userIds[0][i];
    }
    console.log(addresses);
    const addressInsertedResult = await database
      .collection("addresses")
      .insertMany(addresses);

    console.log("Collections success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

collections();

module.exports = collections;
