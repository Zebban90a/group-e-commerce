const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');


exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  const cart  = req.body.cart;
  let productTotal = 0;
  
  async function getPrice(id){
    const product = await Product.findById(id);
    return product.price;
  }
   const setOrderData = async () => {
    for (let i = 0; i < cart.length; i++) {
      cart[i].price = await getPrice(cart[i].id);
       productTotal += cart[i].price*cart[i].quantity;
    } 
    const freight = productTotal > 100 ? 0 : 50;
    
    const orderTotal = parseInt(freight + productTotal);
    const addressData = req.body.formInput;
    
    return {
      purchaser: userId,
      cart: cart,
      orderTotal,
      freight,
      status: 0,
      shippingAddress: addressData,
    };
  };
  const orderData = await setOrderData();
  try {
    const order = await Order.create(orderData);
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
    res.end();
  }
   catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
