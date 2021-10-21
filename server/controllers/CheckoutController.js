const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.GetCart = async (req, res) => {
    const mockUserId = req.params.id;
  
  try {
    const user = await User.findById(mockUserId);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
    console.log(`Server: ${user.cart}`);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
