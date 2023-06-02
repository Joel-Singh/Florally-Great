const path = require('path');
global.appRoot = path.resolve(__dirname);

const express = require('express');
const mongoose = require("mongoose");

const viewEngineSetup = require('./appMiddlewares/viewEngineSetup.js')
const addGeneralMiddleware = require('./appMiddlewares/addGeneralMiddleware.js')
const addRoutes = require('./appMiddlewares/addRoutes.js')
const addErrorHandlingMiddleware = require('./appMiddlewares/addErrorHandlingMiddleware.js')

connectToMongoDB()

const app = express();

viewEngineSetup(app)
addGeneralMiddleware(app)
addRoutes(app)
addErrorHandlingMiddleware(app)

module.exports = app;

async function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  const mongoDB =
    "mongodb+srv://Joel:Joel@flower-store.byzszdj.mongodb.net/?retryWrites=true&w=majority";

  try {
    await mongoose.connect(mongoDB);
  } catch(error) {
    console.error(error)
  }
}
