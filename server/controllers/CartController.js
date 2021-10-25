const User = require('../models/UserModel');

exports.addToCart = async (req, res) => {
  const UserId = req.user[0]._id;
  const ProductId = req.body.productId;
  const ProductPrice = req.body.productPrice;
  const ProductTitle = req.body.productTitle;

  try {
    const users = await User.findOneAndUpdate(
      {
        _id: UserId,
      },
      {
        $push: {
          cart: { Id: ProductId,
          Title: ProductTitle,
          Price: ProductPrice
        },
        },
      },
    );
    res.end();
    console.log(users);
  } catch {
    console.log('error');
  }
};
