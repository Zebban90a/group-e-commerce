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
const { isAdmin } = require('../middleware/authtentication');

const router = express.Router();
// TODO add isAdmin and isLogged in later, and test
router.route('/').get(getProducts).post(imageUpload, createProduct);// createProduct);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
