const Order = require('../models/OrderModel');

exports.findAllOrders = async (req, res) => {
  const { user } = req;
  try {
    const isAdmin = user.roles.includes('admin');
    let orders;
    if (isAdmin) {
      orders = await Order.find({});
    } else {
      orders = await Order.find({
        // eslint-disable-next-line no-underscore-dangle
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
    id,
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
