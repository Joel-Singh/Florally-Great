const Region = require('../models/region')
const asyncHandler = require('express-async-handler')

exports.region_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region list")
})

exports.region_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region detail")
})

exports.region_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region create GET")
})

exports.region_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region create POST")
})

exports.region_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region update GET")
})

exports.region_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region update POST")
})
