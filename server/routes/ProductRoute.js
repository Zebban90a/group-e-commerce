const express = require('express');
const { multerUploads, dataUri } = require('../middleware/multer');
const uploadToCloudinary = require('../config/cloudinary');

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} = require('../controllers/ProductController');

const { isAdmin } = require('../middleware/authentication');
const Product = require('../models/ProductModel');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  // TODO re-enable multerUploads
  .post(isAdmin, /* multerUploads,  */ createProduct);

router
  .route('/cloudinarytest')
  // TODO update createProduct with the contents of async function
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

router
  .route('/TABORT/:id') // FIXME change path to just '/:id' when testing with /cloudinary route is done.
  .get(getSingleProduct)
  // TODO update updateProducts to implement new image functionality
  .patch(isAdmin, /* multerUploads,  */ updateProduct)
  .delete(isAdmin, deleteProduct);

module.exports = router;
