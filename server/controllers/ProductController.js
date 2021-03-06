const Product = require('../models/ProductModel');
const {
  dataUri,
} = require('../middleware/multer');
const uploadToCloudinary = require('../config/cloudinary');

exports.getProducts = async (req, res) => {
  try {
    let products = '';
    const {
      category,
      search,
    } = req.query;

    if (category) {
      products = await Product.find({
        category,
      });
    } else if (search) {
      products = await Product.find({
        title: {
          $regex: search,
          $options: 'i',
        },
      });
    } else {
      products = await Product.find({});
    }
    res.status(200).json({
      status: 'success',
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  const formInputData = JSON.parse(req.body.input);
  const file = dataUri(req).content;

  try {
    const imageData = await uploadToCloudinary(file, 'images');
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
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const formInputData = JSON.parse(req.body.input);
  const deployedData = formInputData;
  
  try {
    if (req.file) {
      const file = dataUri(req).content;
      const imageData = await uploadToCloudinary(file, 'images');
      deployedData.images = imageData.url;
    }
    const product = await Product.findByIdAndUpdate(id, deployedData, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
