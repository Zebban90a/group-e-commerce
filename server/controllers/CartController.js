const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
exports.addToCart = async (req, res) => {
  const userId = req.user._id;
  const id = req.body.productId;
  const price = req.body.price;
  const title = req.body.title;
  const weight = req.body.weight;
  
  try {
    await req.user.cart.push({id: id,
      title: title,
      price: price
    })
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          cart: {
            id: id,
            title: title,
            price: price,
            weight: weight,
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
exports.getCart = async (req, res) => {
  const userId = req.user._id;
  
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

exports.removeProduct = async (req, res) =>{
  let productId = req.body.productId;
  let userId = req.user._Id;
  console.log('REMOVE PRODUCT:',productId);
try{
  await User
  .findByIdAndUpdate(
    userId,
    {
      
      $pull: { cart: { _id: productId } },
    },
    {
      useFindAndModify: false,
    }
  )
  
  res.end("Product was removed!");
}
  catch{
    console.log("ERROR")
  }

  
}
