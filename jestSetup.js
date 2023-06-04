const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const path = require('path')


async function initializeMongoServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", e => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });
}

global.appRoot = path.resolve(__dirname);

initializeMongoServer()

afterEach(clearDatabase)

async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (var key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}
