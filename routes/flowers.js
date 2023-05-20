const express = require("express");
const router = express.Router();

const flower_controller = require('../controllers/flower')
const region_controller = require('../controllers/region')

router.get('/', flower_controller.flower_list)

router.get('/create', region_controller.flower_create_get)
router.post('/create', flower_controller.flower_create_post)

router.get('/:name', flower_controller.flower_detail)
router.get('/:name/update', flower_controller.flower_update_get)
router.post('/:name/update', flower_controller.flower_update_post)

module.exports = router
