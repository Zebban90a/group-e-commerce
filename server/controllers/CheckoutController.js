const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  const cart = req.user.cart;
  console.log(req.user);
  
  const addressData = req.body.formInput;
  console.log(addressData);
  
  const orderData = 
  {
    purchaser: userId,
      cart: cart,
      orderTotal: 400,
      freight:20,
      status: 0,
      shippingAddress: addressData,
}
  try {
    const order = await Order.create(orderData);
    console.log("ORDER SUCCESS");
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
    res.end();
  } catch (err) {
    console.log("CHECKOUT ERROR");
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
