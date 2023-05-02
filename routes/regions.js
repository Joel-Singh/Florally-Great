const express = require("express");
const router = express.Router();

const region_controller = require('../controllers/region')
const flower_and_region_controller = require('../controllers/flower_and_region')

router.get('/', region_controller.region_list)

router.get('/create', region_controller.region_create_get)
router.post('/create', region_controller.region_create_post)

router.get('/create', region_controller.region_create_get)
router.post('/create', region_controller.region_create_post)

router.get('/:name', region_controller.region_detail)
router.get('/:name/update', region_controller.region_update_get)
router.post('/:name/update', region_controller.region_update_post)

module.exports = router
