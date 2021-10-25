const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.placeOrder = async (req, res) => {
  //const userId = req.user[0]._id;
  console.log(req.user);
  // try {
  //   const order = await Order.create();
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       user,
  //     },
  //   });
  //   console.log(`Server: ${user.cart}`);
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
};
