const express = require("express");
const router = express.Router();
const path = require('path')

const requireFlowerController = (controllerName) => {
  return require(path.join(appRoot, 'controllers', 'flower', controllerName))
}

router.get('/', requireFlowerController('list.js'))

router.get('/create', requireFlowerController('create_get'))
router.post('/create', requireFlowerController('create_post'))

router.get('/:name', requireFlowerController('detail.js'))
router.get('/:name/update', requireFlowerController('update_get'))
router.post('/:name/update', requireFlowerController('update_post'))

module.exports = router
