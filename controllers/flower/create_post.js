const asyncHandler = require('express-async-handler')
const path = require('path')
const he = require('he')
const Flower = require(path.join(appRoot, 'models', 'flower.js'))
const Region = require(path.join(appRoot, 'models', 'region.js'))
const renderFlowerForm = require('./renderWrappers/renderFlowerForm')

const { body, validationResult } = require("express-validator");

const regionExistsValidation = asyncHandler(
  body('regionID').custom(async regionID => {
    const regionDocsWithIDs = await Region.find({}, '_id').exec()
    const regionIDArray = regionDocsWithIDs.map(doc => doc._id.toString())

    if (!regionIDArray.includes(regionID))
      throw new Error('Region does not exist')
  })
)

const validationFunctions = [
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

  regionExistsValidation
]

const validateInput = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    await renderFlowerForm(
      res,
      next,
      { errors: errors.array()}
    )
    return
  }
  next();
}

const checkDuplicateFlower = asyncHandler(async (req, res, next) => {
  const { name } = req.body
  const flowerExists = await Flower.findOne({ name }).exec()
  if (flowerExists) {
    await renderFlowerForm(
      res,
      next,
      { errors: [{ msg: 'Flower already exists'}] }
    )
    return
  }
  next();
})

const saveFlower = asyncHandler(async (req, res, next) => {
    const { name, description, price, numberInStock, regionID } = req.body
    const priceToNumber = parseFloat(price.slice(1))

    const convertedName = he.decode(name)
    const convertedDescription = he.decode(description)

    const flower = new Flower(
      {
        name: convertedName,
        description: convertedDescription,
        price: priceToNumber,
        numberInStock,
        region: regionID
      }
    )
    await flower.save()
    res.redirect(flower.url)
  }
)

module.exports = [
  validationFunctions,
  validateInput,
  checkDuplicateFlower,
  saveFlower
]
