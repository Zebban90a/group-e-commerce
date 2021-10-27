const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  const { cart } = req.user;
  let productTotal = 0;

  // REVIEW NaN according to error
  // const userData = {
  //   cart: []
  // }
  const setOrderData = async () => {
    for (let i = 0; i < cart.length; i++) {
      productTotal += cart[i].price;
      // freightTotal += cart[i].weight; // TODO figure out a reasonable freight figure per item or weight.
    }
    const freight = productTotal > 100 ? 0 : 50;
    const orderTotal = freight + productTotal;
    const addressData = req.body.formInput;

    return {
      purchaser: userId,
      cart,
      orderTotal,
      freight,
      status: 0,
      shippingAddress: addressData,
    };
  };
  const orderData = await setOrderData();
  try {
    const order = await Order.create(orderData);
    console.log('ORDER SUCCESS');
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
    res.end();
  } catch (err) {
    console.log('CHECKOUT ERROR');
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
