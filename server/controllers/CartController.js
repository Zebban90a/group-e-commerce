const User = require('../models/UserModel');

exports.addToCart = async (req, res) => {
  const UserId = req.body.userId;
  const ProductId = req.body.productId;

  try {
    const users = await User.findOneAndUpdate(
      {
        _id: UserId,
      },
      {
        $push: {
          cart: ProductId,
        },
      },
    );
    res.end();
    console.log(users);
  } catch {
    console.log('error');
  }
};
