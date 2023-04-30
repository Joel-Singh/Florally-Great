const Flower = require('../models/flower')
const asyncHandler = require('express-async-handler')

exports.flower_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower list")
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
