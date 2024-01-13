const path = require("path");
global.appRoot = path.resolve(__dirname);
require("dotenv").config();

const mongoose = require("mongoose");

const {
  default: configureExpressApp,
} = require("./appMiddlewares/configureExpressApp");

async function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  const mongoDB = process.env.MONGODB_CONNECTION_URL;

  try {
    await mongoose.connect(mongoDB);
  } catch (error) {
    console.error(error);
  }
}

connectToMongoDB();

const app = configureExpressApp({
  viewEngine: true,
  generalMiddleware: true,
  routes: true,
  errorHandling: true,
});

module.exports = app;
