const Product = require("../models/ProductModel");


exports.getProducts = async (req, res) => {
  const query = req.query;
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

exports.createProduct = async function (req, res) {
  const imagePath= req.file.path
  const formInputData = JSON.parse(req.body.input)
  
  try {
    const productExists = await Product.exists({
      title: formInputData.title
    });
    if (productExists) {
      throw Error("productExists");
    } else {
      let deployedData = formInputData; //TODO Is there a cleaner way?
      deployedData.images= imagePath
      const newProduct = await Product.create(deployedData);
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