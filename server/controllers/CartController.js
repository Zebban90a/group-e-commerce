const User = require('../models/UserModel');

exports.addToCart = async (req, _res) => {
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
    console.log(users);
  } catch {
    console.log('error');
  }
};
