const express = require("express");
const router = express.Router();

const flower_controller = require('../controllers/flower')

router.get('/flowers', flower_controller.flower_list)
router.get('/flowers/:name', flower_controller.flower_detail)

router.get('/flowers/create', flower_controller.flower_create_get)
router.post('/flowers/create', flower_controller.flower_create_post)

router.get('/flowers/:name/update', flower_controller.flower_update_get)
router.post('/flowers/:name/update', flower_controller.flower_update_post)

module.exports = router
