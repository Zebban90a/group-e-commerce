const express = require('express');
// const cloudinary = require('cloudinary');
const { multerUploads, dataUri } = require('../middleware/multer');
const uploadToCloudinary = require('../config/cloudinary');
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
const Product = require('../models/ProductModel');

const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post(isAdmin, /* imageUpload,  */ createProduct);

router
  .route('/cloudinarytest')
  .post(multerUploads, async (req, res) => {
    try {
      const file = dataUri(req).content;
      console.log('req.body', req.body);
      console.log('req.body.title', req.body.title);
      const imageData = await uploadToCloudinary(file, 'images');
      console.log(imageData);
      const formInputData = req.body;
      const productExists = await Product.exists({
        title: formInputData.title,
      });
      if (productExists) {
        throw Error('Product already exists');
      } else {
        const deployedData = formInputData;
        deployedData.images = imageData.url;
        const newProduct = await Product.create(deployedData);
        res.status(201).json({
          status: 'success',
          data: {
            newProduct,
          },
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  });
/* if (req.file) {
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
  } */

router
  .route('/TABORT/:id') // FIXME change path to just '/:id' when testing is done.
  .get(getSingleProduct)
  .patch(isAdmin, /* imageUpload,  */ updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = router;
