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
  //console.log("req.files", req);
  console.log(req.body.image);
  //  console.log(req.files.images);

  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const manufacturer = req.body.manufacturer;
  const weight = req.body.weight;
  const imagePath = req.files.path;
  try {
    const productExists = await Product.exists({
      title: req.body.title
    });
    if (productExists) {
      throw Error("productExists");
    } else {
      const newProduct = await Product.create({
        title: title,
        description: description,
        price: price,
        category: category,
        quantity: quantity,
        manufacturer: manufacturer,
        weight: weight,
        images: imagePath
      });
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