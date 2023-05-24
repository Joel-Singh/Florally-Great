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
    const regionData = getRegionData()
    const regions = await Region.insertMany(regionData);
    console.log('Regions added:', regions);
    return regions;
  }

  async function populateFlowerData(regions) {
    const flowerData = getFlowerData()
    const flowerDocuments = flowerData.map(flower => {
      const regionId = regions.find(region => region.name === flower.regionName);
      flower.region = regionId;
      delete flower.regionName

      return new Flower(flower);
    });

    const flowers = await Flower.insertMany(flowerDocuments);
    console.log('Flowers added:', flowers);
  }
}

function getRegionData() {
  return [
    {
      name: 'Tropical',
      description: 'Tropical region with a hot and humid climate'
    },
    {
      name: 'Mediterranean',
      description: 'Mediterranean region with a mild and temperate climate'
    },
    {
      name: 'Arctic',
      description: 'Arctic region with a very cold and harsh climate'
    },
    {
      name: 'Desert',
      description: 'Desert region with an extremely dry climate and drastic temperature changes'
    },
    {
      name: 'Temperate',
      description: 'Temperate region with a moderate climate, characterized by distinct seasons'
    }
  ];
}

function getFlowerData() {
  return [
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
    },
    {
      name: 'Hibiscus',
      description: 'A vibrant tropical flower with large, showy petals',
      price: 20,
      numberInStock: 15,
      regionName: 'Tropical'
    },
    {
      name: 'Oleander',
      description: 'An evergreen shrub with colorful, fragrant flowers',
      price: 18,
      numberInStock: 12,
      regionName: 'Mediterranean'
    },
    {
      name: 'Arctic Poppy',
      description: 'A small, resilient flower adapted to Arctic conditions',
      price: 30,
      numberInStock: 8,
      regionName: 'Arctic'
    },
    {
      name: 'Arctic Willow',
      description: 'A low-growing plant with small, delicate flowers',
      price: 22,
      numberInStock: 14,
      regionName: 'Arctic'
    },
    {
      name: 'Cactus Flower',
      description: 'A short-lived, yet stunning bloom from desert cacti',
      price: 28,
      numberInStock: 9,
      regionName: 'Desert'
    },
    {
      name: 'Yucca',
      description: 'A desert plant with tall, white flower clusters',
      price: 35,
      numberInStock: 6,
      regionName: 'Desert'
    },
    {
      name: 'Rose',
      description: 'A classic flower with a wide variety of colors and fragrances',
      price: 40,
      numberInStock: 25,
      regionName: 'Temperate'
    },
    {
      name: 'Tulip',
      description: 'A popular spring flower with a simple, elegant shape',
      price: 10,
      numberInStock: 30,
      regionName: 'Temperate'
    }
  ];
}
