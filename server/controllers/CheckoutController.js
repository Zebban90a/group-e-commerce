const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  
  const cart  = req.body.cart;
  let productTotal = 0;
  
  
  let orderCart = [];
  

  // const setOrderData = async () => {
    for (let i = 0; i < cart.length; i++) {
      console.log(cart[i]);
      // productTotal += cart[i].price;
      
    }
    

  
  //   const freight = productTotal > 100 ? 0 : 50;
    
  //   const orderTotal = parseInt(freight + productTotal);
  //   console.log(typeof orderTotal);
  //   const addressData = req.body.formInput;
    
  //   return {
  //     purchaser: userId,
  //     cart: cart,
  //     orderTotal,
  //     freight,
  //     status: 0,
  //     shippingAddress: addressData,
  //   };
  // };
  // const orderData = await setOrderData();
  // try {
    
  //   const order = await Order.create(orderData);
  //   console.log('ORDER SUCCESS');
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       order,
  //       user
  //     },
  //   });
  //   res.end();
  // }
 
  //  catch (err) {
  //   console.log('CHECKOUT ERROR');
  //   console.log(err);
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
//   }
};
