const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

exports.placeOrder = async (req, res) => {
  const userId = req.user[0]._id;
  // const addressData = req.body.formInput;
  const orderData = 
  {
    purchaser: "616584cf8b04b9069807c7af",
      products: [
          {
              productId:"61658a1c2e620ab1b18dd34a",
              quantity:1,
              productPrice:400
          }
      ],
      orderTotal: 400,
      freight:20,
      status: 0,
      address: {
          zip: "12345",
          city: "Gotham",
          street: "Waynestreet",
          houseNumber: 10
      },
      "contact": {
          "tel": 555555123,
          "email": "kweku@gmail.com"
  }
}
  

  try {
    
      
      
   
    
    const order = await Order.create(orderData);

    

    
    console.log("HEJ");
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
    res.end();
  } catch (err) {
    console.log("CHECKOUT ERROR");
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
