const express = require("express");
const router = express.Router();
const path = require('path')

const flower_controller = require('../controllers/flower')

const requireFlowerController = (controllerName) => {
  return require(path.join(appRoot, 'controllers', 'flower', controllerName))
}

router.get('/', requireFlowerController('list.js'))

router.get('/create', flower_controller.flower_create_get)
router.post('/create', flower_controller.flower_create_post)

router.get('/:name', flower_controller.flower_detail)
router.get('/:name/update', flower_controller.flower_update_get)
router.post('/:name/update', flower_controller.flower_update_post)

module.exports = router
