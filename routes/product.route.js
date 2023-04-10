const express = require('express');
const authorization = require('../middleware/authorization');
const productsController = require('../controllers/product.controller');
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/file-upload', uploader.single('image'), productsController.fileUpload);

router
    .route('/')
    .get(productsController.getProducts)
    .post(verifyToken, authorization('admin', 'store-manager'), productsController.createProduct);

router.route('/bulk-update/').patch(productsController.bulkUpdateProduct);
router.route('/bulk-delete/').delete(productsController.bulkDeleteProduct);

router
    .route('/:id')
    .patch(productsController.updateProductById)
    .delete(verifyToken, authorization('admin'), productsController.deleteProductById);

module.exports = router;
