const express = require('express');
const cloudinary = require('cloudinary');
const { multerUploads, dataUri } = require('../middleware/multer');
const cloudinaryConfig = require('../config/cloudinary');
// const multer = require('multer');
// const path = require('path');

/* const imageStorage = multer.diskStorage({
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
}).single('image'); */

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

const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post(isAdmin, /* imageUpload,  */ createProduct);

router
  .use(cloudinaryConfig)
  .route('/cloudinarytest')
  .post(multerUploads, (req, res) => {
    if (req.file) {
      const file = dataUri(req).content;
      return cloudinary.uploader.upload(file).then((result) => {
        const image = result.url;
        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          data: { image },
        });
      }).catch((err) => res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: { err },
      }));
    }
  });

router
  .route('/TABORT/:id')
  .get(getSingleProduct)
  .patch(isAdmin, /* imageUpload,  */ updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = router;
