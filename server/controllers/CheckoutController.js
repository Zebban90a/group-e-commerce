const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  const cart = req.user.cart;
  let orderTotal = 0;
  let freightTotal = 0;
  
  for(let i = 0; i < cart.length; i++){
     orderTotal += cart[i].price;
     freightTotal += cart[i].weight; //TODO figure out a reasonable freight figure per item or weight.
  }
  console.log('TOTAL:',orderTotal);
  const addressData = req.body.formInput;
  console.log(addressData);
  console.log(freightTotal) //REVIEW NaN according to error
  // const userData = {
  //   cart: []
  // }
  const orderData = {
    purchaser: userId,
    cart: cart,
    orderTotal: orderTotal,
    freight: freightTotal,
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
    console.log(err)
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};