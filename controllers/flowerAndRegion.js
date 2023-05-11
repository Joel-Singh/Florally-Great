const Region = require('../models/region')
const Flower = require('../models/flower')
const asyncHandler = require('express-async-handler')

exports.all_flowers_in_region = asyncHandler(async (req, res, next) => {
  const regionName = req.params.name
  let region =
    await Region.findOne({name: regionName}).exec()

  let flowersInRegion =
    await Flower.find({region: region._id})

  res.render('regions/all_flowers_in_region', {
    region,
    flower_list: flowersInRegion,
  })
})

exports.index = asyncHandler(async (req, res, next) => {
  const [
    flowerCount,
    regionCount
  ] = await Promise.all([
      Flower.countDocuments({}).exec(),
      Region.countDocuments({}).exec()
  ])
  res.render('index', {
    title: 'Florally Great',
    flower_count: flowerCount,
    region_count: regionCount
  })
})
