const Flower = require('../models/flower')
const asyncHandler = require('express-async-handler')

exports.flower_list = asyncHandler(async (req, res, next) => {
  const allFlowers = await Flower.find({}, 'name description url')
    .sort({ name: 1 })
    .populate('region', 'name')
    .exec()

  res.render('all_flowers', { flower_list: allFlowers, title: 'All Flowers'})
})

exports.flower_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower detail")
})

exports.flower_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower create GET")
})

exports.flower_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower create POST")
})

exports.flower_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower update GET")
})

exports.flower_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower update POST")
})
