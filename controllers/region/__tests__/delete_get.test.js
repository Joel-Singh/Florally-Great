const path = require("path");
const express = require("express");
const request = require("supertest");

const formatHtml = require("../../testingUtils/formatHtml.js");

const addGeneralMiddleware = require(path.join(
  appRoot,
  "appMiddlewares",
  "addGeneralMiddleware.js"
));
const viewEngineSetup = require(path.join(
  appRoot,
  "appMiddlewares",
  "viewEngineSetup.js"
));
const Region = require(path.join(appRoot, "models", "region.js"));

const delete_get = require("../delete_get.js");

test("delete_get controller renders with regions", async () => {
  const app = configureExpressApp();
  app.use("/", delete_get);

  await addSomeRegionsToDatabase();

  const response = await request(app).get("/");
  const formattedHtml = formatHtml(response.text);
  expect(formattedHtml).toMatchSnapshot();
});

function configureExpressApp() {
  const app = express();

  viewEngineSetup(app);
  addGeneralMiddleware(app);

  return app;
}

async function addSomeRegionsToDatabase() {
  await addRegion("name 1", "desc 1", "647cd591a7047c50e71bc287");
  await addRegion("name 2", "desc 2", "647cd591a7047c50e71bc288");
  await addRegion("name 3", "desc 3", "647cd591a7047c50e71bc289");

  async function addRegion(name, description, _id) {
    const region = new Region({ name, description, _id });
    await region.save();
  }
}
