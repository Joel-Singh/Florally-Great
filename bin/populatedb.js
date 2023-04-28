console.log(
  'This script populates some test flowers and regions to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

const mongoose = require('mongoose');
const Flower = require('../models/flower');
const Region = require('../models/region');

main().catch(error => console.error(error))

async function main() {
  await mongoose.connect(mongoDB)
    .then(() => console.log('Connected to MongoDB'))

  await populateDatabase()

  mongoose.connection.close();
}

async function populateDatabase() {
  const regions = await populateRegionData();
  await populateFlowerData(regions);


  async function populateRegionData() {
    const regionData = [
      {
        name: 'Tropical',
        description: 'Tropical region with a hot and humid climate'
      },
      {
        name: 'Mediterranean',
        description: 'Mediterranean region with a mild and temperate climate'
      }
    ];

    const regions = await Region.insertMany(regionData);
    console.log('Regions added:', regions);
    return regions;
  }

  async function populateFlowerData(regions) {
    const flowerData = [
      {
        name: 'Orchid',
        description: 'A beautiful tropical flower',
        price: 25,
        numberInStock: 10,
        regionName: 'Tropical'
      },
      {
        name: 'Lavender',
        description: 'A fragrant flower native to the Mediterranean region',
        price: 15,
        numberInStock: 20,
        regionName: 'Mediterranean'
      }
    ];

    const flowerDocuments = flowerData.map(flower => {
      debugger;
      const regionId = regions.find(region => region.name === flower.regionName);
      flower.region = regionId;
      delete flower.regionName

      return new Flower(flower);
    });

    const flowers = await Flower.insertMany(flowerDocuments);
    console.log('Flowers added:', flowers);
  }
}
