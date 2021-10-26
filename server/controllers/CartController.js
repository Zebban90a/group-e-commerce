const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.addToCart = async (req, res) => {
  //console.log(req)
  const userId = req.user._id;
  const ProductId = req.body.productId;
  const ProductPrice = req.body.productPrice;
  const ProductTitle = req.body.productTitle;

  try {
    req.user.cart.push({Id: ProductId,
      Title: ProductTitle,
      Price: ProductPrice,})
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
    console.log(userId);
    res.end();
    // console.log(users);
  } catch {
    console.log('error');
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user._id;
  console.log('REQ USER CART:',req.user.cart);

  try {
    const user = await User.findById(userId);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
