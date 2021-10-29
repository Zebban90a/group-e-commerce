const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

exports.placeOrder = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id;
  const { cart } = req.body;
  let productTotal = 0;

  async function getPrice(id) {
    const product = await Product.findById(id);
    return product.price;
  }

  const setOrderData = async () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cart.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      cart[i].price = await getPrice(cart[i].id);
      productTotal += cart[i].price * cart[i].quantity;
    }

    const freight = productTotal > 100 ? 0 : 50;
    const orderTotal = parseInt(freight + productTotal, 10);
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
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
    res.end();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
