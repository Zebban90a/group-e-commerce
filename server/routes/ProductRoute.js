const express = require('express');
const { multerUploads } = require('../middleware/multer');

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} = require('../controllers/ProductController');

const { isAdmin } = require('../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(isAdmin, multerUploads, createProduct);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch(isAdmin, multerUploads,  updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = router;
