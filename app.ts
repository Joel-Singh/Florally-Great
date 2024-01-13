import mongoose from "mongoose";
import configureExpressApp from "./appMiddlewares/configureExpressApp";
import "dotenv/config";

async function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  const mongoDB = process.env.MONGODB_CONNECTION_URL;

  try {
    //@ts-ignore
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

export default app;
