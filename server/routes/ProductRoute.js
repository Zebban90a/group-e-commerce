const express = require('express');
const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: 'images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()
    }${path.extname(file.originalname)}`);
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  },
}).single('image');

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} = require('../controllers/ProductController');

// NOTE auth troubleshoot, isloggedin potentially misplaced or wrong solution in general
//! Important if testing isLoggedIn make sure to test in combination with a logout function or deleting cookie
const {
  isAdmin
} = require('../middleware/authentication');

const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post( /* isAdmin,  */ imageUpload, createProduct); // createProduct);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch( /* isAdmin,  */ updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = router;