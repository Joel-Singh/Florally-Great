import express from "express";
import request from "supertest";

import formatHtml from "../../testingUtils/formatHtml.ts";

import delete_get from "../delete_get.ts";
import addGeneralMiddleware from "../../../appMiddlewares/addGeneralMiddleware.ts";
import viewEngineSetup from "../../../appMiddlewares/viewEngineSetup.ts";
import Region from "../../../models/region.ts";

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
