const asyncHandler = require('express-async-handler')
const path = require('path')
const Flower = require(path.join(appRoot, 'models', 'flower.js'))

const { body, validationResult } = require("express-validator");

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
]

const validateInput = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("flowers/flower_form", {
      errors: errors.array()
    })
    return
  }
  next();
}

module.exports = [
  ...validationFunctions,
  validateInput,

  asyncHandler(async (req, res, next) => {
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
  )
]