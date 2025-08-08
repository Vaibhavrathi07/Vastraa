const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const productController = require('../controller/productController');
const adminAuth = require('../middleware/adminAuth');


// POST /api/products/add-product
router.post(
  '/add-product',adminAuth,
  upload.array('images', 4), // Handle up to 4 images
  productController.addProduct
);



router.get('/list-products', productController.listProducts);
router.post('/remove-product',adminAuth, productController.removeProduct);
router.post('/single-product',adminAuth, productController.singleProduct);




module.exports = router;