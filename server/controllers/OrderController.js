const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Oops! Something went wrong.',
    });
  }
};

exports.findAllOrders = async (req, res) => {
  const user = req.user;
  try {
    const isAdmin = user.roles.includes('admin');
    let orders;
    if (isAdmin) {
      orders = await Order.find({});
    } else {
      orders = await Order.find({
        purchaser: user._id,
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Oops! Something went wrong.',
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const {
    id
  } = req.params;
  const newStatus = req.body.status;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, {
      status: newStatus,
    }, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        updatedOrder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Oops! Something went wrong.',
    });
  }
};

exports.addToCart = async (req, res) => {
  console.log(`User:${req.body.userId}`);
  console.log(`Product:${req.body.productId}`);
};