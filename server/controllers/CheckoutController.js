const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  const cart = req.user.cart;
  let orderTotal = 0;
  //let freightTotal = 0;
  let occurrences = [];
  let newCart = [];

  
  for(let i = 0; i < cart.length; i++){
     orderTotal += cart[i].price;
     //freightTotal += cart[i].weight; //TODO figure out a reasonable freight figure per item or weight.
     occurrences.push(cart[i].id);
     console.log(cart[i].weight);
  }
  //console.log(occurrences);
  const quantity = occurrences.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});

  for (const [key, value] of Object.entries(quantity)) {
    newCart.push({id:key, quantity:value});
  }
  
  console.log(newCart);
  
  // console.log('TOTAL:',orderTotal);
  const addressData = req.body.formInput;
  // console.log(addressData);
  // console.log(freightTotal) //REVIEW NaN according to error
  // const userData = {
  //   cart: []
  // }
  const emptyCart={
    cart= []
  }
  const orderData = {
    purchaser: userId,
    cart: newCart,
    orderTotal: orderTotal,
    //freight: freightTotal,
    status: 0,
    shippingAddress: addressData,
  }
  try {
    const user = await User.findOneAndUpdate()
    const order = await Order.create(orderData);
    console.log("ORDER SUCCESS");
    res.status(200).json({
      status: 'success',
      data: {
        order,
        user
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