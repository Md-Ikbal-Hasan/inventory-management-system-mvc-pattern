const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.route('/').post(categoryController.createCategory).get(categoryController.getCategories);

module.exports = router;
