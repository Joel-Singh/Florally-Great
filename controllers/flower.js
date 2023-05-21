const Flower = require('../models/flower')
const Region = require('../models/region')
const asyncHandler = require('express-async-handler')
const he = require('he')

const { body, validationResult } = require("express-validator");

exports.flower_detail = asyncHandler(async (req, res, next) => {
  const flowerName = req.params.name
  let flower =
    await Flower.findOne({name: flowerName})
      .populate('region', 'name')
      .exec()

  const { name, description, price, numberInStock } = flower
  res.render('flowers/flower_detail', {
    title: name,
    name,
    description,
    price,
    numberInStock,
    region: flower.region,
  })
})

exports.flower_create_get = asyncHandler(async (req, res, next) => {
  const allRegions = await Region.find({}, 'name').exec()
  res.render('flowers/flower_form', { regionList: allRegions})
})

exports.flower_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1}).withMessage(`Name can't be empty`)
    .escape(),

  body('description')
    .trim()
    .isLength({ min: 1}).withMessage(`Description can't be empty`)
    .escape(),

  body('numberInStock')
    .trim()
    .isLength({ min: 1}).withMessage(`Number in stock can't be empty`)
    .isNumeric().withMessage('Number in stock needs to be a number'),

  body('price')
    .trim()
    .isLength({ min: 1}).withMessage(`Price can't be empty`)
    .matches(/\$[0-9]+\.[0-9][0-9]/).withMessage('Price needs to be in $x.xx format, e.g $3.86 or $287.00'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.render("flowers/flower_form", {
        errors: errors.array()
      })
      return
    } else {
      const { name, description, price, numberInStock, region } = req.body
      const flowerExists = await Flower.findOne({ name }).exec()

      if (flowerExists) {
        res.render('flowers/flower_form', {
          errors: [{ msg: 'Flower already exists'}]
        })
      } else {
        const priceToNumber = parseFloat(price.slice(1))

        const convertedName = he.decode(name)
        const convertedDescription = he.decode(description)

        const flower = new Flower(
          {
            name: convertedName,
            description: convertedDescription,
            price: priceToNumber,
            numberInStock,
            region
          }
        )
        await flower.save()
        res.redirect(flower.url)
      }
    }
  })
]

exports.flower_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower update GET")
})

exports.flower_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Flower update POST")
})
