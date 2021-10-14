const Product = require("../models/ProductModel");
const multer = require('multer');
const path = require('path')

exports.getProducts = async (req, res) => {
  const query = req.query;
  console.log('hej')
  try {
    const products = await Product.find(query);
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  console.log(req.images)
  console.log(req.body)
  
  try {
    const productExists = await Product.exists({ title: req.body.title });
    if (productExists) {
      throw Error("productExists");
    } else {
      const newProduct = await Product.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          newProduct,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    console.log(err)
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const uploadPath = 'public/uploads/';   
const storageEngine = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));}});
//Multer engine
/*const storageEngine = multer.diskStorage ({
  destination: '../public/uploads/',
  filename: function (req, file, callback) {
    callback (
      null,
      file.fieldname + '-' + Date.now () + path.extname (file.originalname)
    );
  },
});*/


// file filter for multer
const fileFilter = (req, file, callback) => {
  let pattern = /jpg|png|svg/; // reqex

  if (pattern.test (path.extname (file.originalname))) {
    callback (null, true);
  } else {
    callback ('Error: not a valid file');
  }
}; 

// initialize multer
exports.uploadImages = multer ({
  storage: storageEngine,
  fileFilter  
});
