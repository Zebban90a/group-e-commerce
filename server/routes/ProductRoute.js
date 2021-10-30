const express = require('express');
const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: 'images',
  filename: (_req, file, cb) => {
    cb(null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('Please upload a Image'));
    }
    return cb(undefined, true);
  },
}).single('image');

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} = require('../controllers/ProductController');

const {
  isAdmin,
} = require('../middleware/authentication');
console.log('ProductRoute')
const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post(isAdmin, imageUpload, createProduct);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch(isAdmin, imageUpload, updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = router;
