const path = require("path");
global.appRoot = path.resolve(__dirname);

const mongoose = require("mongoose");

const configureExpressApp = require("./appMiddlewares/configureExpressApp");

connectToMongoDB();

const app = configureExpressApp({
  viewEngine: true,
  generalMiddleware: true,
  routes: true,
  errorHandling: true,
});

module.exports = app;

async function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  const mongoDB =
    "mongodb+srv://Joel:Joel@flower-store.byzszdj.mongodb.net/?retryWrites=true&w=majority";

  try {
    await mongoose.connect(mongoDB);
  } catch (error) {
    console.error(error);
  }
}
