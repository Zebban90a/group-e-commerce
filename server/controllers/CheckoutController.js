const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  const { cart } = req.user;
  let productTotal = 0;
  let occurrences = [];
  let orderCart = [];
  console.log(cart);

  const setOrderData = async () => {
    for (let i = 0; i < cart.length; i++) {
      productTotal += cart[i].price;
      occurrences.push(cart[i].id);
    }
    const quantity = occurrences.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});

  for (const [key, value] of Object.entries(quantity)) {
    orderCart.push({id:key, quantity:value});
  }
    const freight = productTotal > 100 ? 0 : 50;
    const orderTotal = freight + productTotal;
    const addressData = req.body.formInput;

    return {
      purchaser: userId,
      cart: orderCart,
      orderTotal,
      freight,
      status: 0,
      shippingAddress: addressData,
    };
  };
  const orderData = await setOrderData();
  try {
    if(orderCart.length > 0){
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull:{
          cart:{}
        }
      }
      );
    req.user.cart=[];
    const order = await Order.create(orderData);
    console.log('ORDER SUCCESS');
    res.status(200).json({
      status: 'success',
      data: {
        order,
        user
      },
    });
    res.end();
  }
  else{
    throw Error("ERROR, NO PRODUCTS")
  }
  } catch (err) {
    console.log('CHECKOUT ERROR');
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
