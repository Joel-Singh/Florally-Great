const path = require('path')

const express = require("express");
const mongoose = require('mongoose')
const Region = require(path.join(appRoot, 'models', 'region.js'))
const Flower = require(path.join(appRoot, 'models', 'flower.js'))
const sendFormData = require(path.join(appRoot, 'testingUtils', 'sendFormData.js'))

const delete_post = require('../delete_post')

let app;
const initializeInMemoryMongoDB = require(path.join(
  appRoot, 'testingUtils', 'initializeInMemoryMongoDB.js')
)

beforeAll(async () => {
  app = configureExpressApp()
  await initializeInMemoryMongoDB()
})

describe('On region without a flower', () => {
  test("Region is deleted", async () => {
    const id = await saveRegionToBeDeleted()

    await sendFormData(app, '/', { region: id})

    const foundRegion = await Region.findById(id).exec()
    expect(foundRegion).toBeNull()
  });

})

test("Region isn't deleted when it has flower", async () => {
  const id = await saveRegionToBeDeleted()

  const flowerInRegion = new Flower({
    name: 'Flower',
    description: 'desc',
    price: '32',
    numberInStock: '1',
    region: id
  })

  await flowerInRegion.save()

  await sendFormData(app, '/', { region: id})

  const foundRegion = await Region.findById(id).exec()
  expect(foundRegion).not.toBeNull()

})

afterAll(async () => {
  await mongoose.connection.close()
})

function configureExpressApp() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use("/", delete_post);

  return app
}

async function saveRegionToBeDeleted() {
  const regionToBeDeleted = new Region({
    name: 'Region Name',
    description: "I'm gonna be deleted!"
  })

  const regionToBeDeletedDoc = await regionToBeDeleted.save()
  const id = regionToBeDeletedDoc._id

  return id
}
