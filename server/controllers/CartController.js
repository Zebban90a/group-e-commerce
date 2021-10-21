const User = require('../models/UserModel');

exports.addToCart = async (req, res) => {
  const { userId } = req.body.userId;
  const { productId } = req.body.productId;
  console.log(`User:${req.body.userId}`);
  console.log(`Product:${req.body.productId}`);

//   try {
    const user = await User.findOne({ userId });

   // const itemIndex = user.cart.findIndex((p) => p.productId == productId);

    //   if (itemIndex > -1) {
    //     //product exists in the cart, update the quantity
    //     let productItem = user.cart[itemIndex];
    //     productItem.quantity =+ 1;
    //     cart.products[itemIndex] = productItem;
    //   } else {
    // product does not exists in cart, add new item
    user.cart.push({ productId });
    // }
//     const savedUser = await user.save();
//     return res.status(201).send(savedUser);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Something went wrong');
//   }
};
