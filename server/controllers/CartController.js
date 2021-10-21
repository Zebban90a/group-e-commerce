const User = require('../models/UserModel');



exports.addToCart = async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  console.log(`User:${userId}`);
  console.log(`Product:${productId}`);

  try {
    const user = await User.findByIdAndUpdate(userId, productId, {
      new: true,
      runValidators: true,
    });
    const userCart = user.cart;
    userCart.push(productId);
    
    console.log(user);
    res.status(200).json({
      status: 'success',

      userCart,

    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
