const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
exports.addToCart = async (req, res) => {
  const userId = req.user._id;
  const id = req.body.productId;
  const price = req.body.price;
  const title = req.body.title;
  const weight = req.body.weight;
  console.log(id);
  
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
    
    // console.log(users);
  } catch {
    console.log('error');
  }
};
exports.getCart = async (req, res) => {
  const userId = req.user._id;
  console.log(req.user.cart);
  console.log(req.user);
  
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

exports.removeProduct =  async (req, res) =>{
  let id = req.body.productId;
  let userId = req.user._id;
  console.log('USER._ID:',userId)
  console.log('REMOVE PRODUCT:',id);
try{
  await User
  .findByIdAndUpdate(
    userId,
    {
      
      $pull: { cart: { _id: id } },
    },
    {
      useFindAndModify: false,
    }
    
  ); 
  
  res.end("Product was removed!");
}
  catch{
    console.log("ERROR")
  }

  
}
