const asyncHandler = require("express-async-handler");
const path = require("path");
const { default: Flower } = require(path.join(appRoot, "models", "flower.ts"));
const {
  default: renderFlowerForm,
} = require("./rendersWithDefaultLocals/renderFlowerForm.ts");
const {
  default: validateFlowerRequest,
} = require("./util/validateFlowerRequest.ts");
const { validationResult } = require("express-validator");
const {
  default: getFlowerModelDataFromReqBody,
} = require("./util/getFlowerModelDataFromReqBody.ts");

module.exports = [
  validateFlowerRequest,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await renderFlowerForm(res, { errors: errors.array() });
    } else {
      const flower = await saveFlower(req);
      res.redirect(flower.url);
    }
  }),
];

async function saveFlower(req) {
  const flower = new Flower(getFlowerModelDataFromReqBody(req));
  await flower.save();
  return flower;
}
