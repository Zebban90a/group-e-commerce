const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.GetCart = async (req, res) => {
  const  userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
