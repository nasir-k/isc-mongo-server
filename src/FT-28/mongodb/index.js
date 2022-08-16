const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/ISC");

const connect = async () => {
  try {
    await client.connect();
    console.log("connected to MongoDB Compass");
  } catch (error) {
    console.log(error);
    client.close();
  }
};

connect();
const database = client.db();

const createUser = async (user) => {
  try {
    const result = await database.collection("users").insertOne(user);
    return result;
  } catch (error) {
    return false;
  }
};

const createAddress = async (address) => {
  try {
    const result = await database.collection("addresses").insertOne(address);
    return result;
  } catch (error) {
    return false;
  }
};

module.exports = {
  database,
  createUser,
  createAddress,
};
