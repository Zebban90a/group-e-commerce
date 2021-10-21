const User = require('../models/UserModel');

exports.addToCart = async (req, res) => {
  const { userId } = req.body.userId;
  const { productId } = req.body.productId;
  console.log(`User:${req.body.userId}`);
  console.log(`Product:${req.body.productId}`);

    
    try {
      const user = await User.findByIdAndUpdate(userId, productId, {
        new: true,
        runValidators: true,
      });
      user.cart.push(productId);
      res.status(200).json({
        status: 'success',
        
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
};
