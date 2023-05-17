const Region = require('../models/region')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");

exports.region_list = asyncHandler(async (req, res, next) => {
  const allRegions = await Region.find({}, 'name description url')
    .sort({ name: 1 })
    .exec()

  res.render('regions/all_regions', { region_list: allRegions, title: 'All Regions'})
})

exports.region_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region detail")
})

exports.region_create_get = asyncHandler(async (req, res, next) => {
  res.render('regions/region_form')
})

exports.region_create_post = [
  body('name', `Name can't be empty`)
    .trim()
    .isLength({ min: 1})
    .escape(),

  body('description', `Description can't be empty`)
    .trim()
    .isLength({ min: 1})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.render("regions/region_form", {
        errors: errors.array()
      })
      return
    } else {
      const { name, description } = req.body
      const regionExists = await Region.findOne({ name }).exec()

      if (regionExists) {
        res.render('regions/region_form', {
          errors: [{ msg: 'Region already exists'}]
        })
      } else {
        const region = new Region({name, description})
        await region.save()
        res.redirect(region.url)
      }
    }
  })
]


exports.region_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region update GET")
})

exports.region_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Region update POST")
})
