const User = require('../models/UserModel');

exports.addToCart = async (req, res) => {
  const logUser = async (user) => user[0]._id;

  const userId = await logUser(req.user);
  
  const ProductId = req.body.productId;
  const ProductPrice = req.body.productPrice;
  const ProductTitle = req.body.productTitle;

  try {
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          cart: {
            Id: ProductId,
            Title: ProductTitle,
            Price: ProductPrice,
          },
        },
      },
    );
    res.end();
    // console.log(users);
  } catch {
    console.log('error');
  }
};
