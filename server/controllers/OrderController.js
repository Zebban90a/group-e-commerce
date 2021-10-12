const Order = require("../models/OrderModel");

exports.createOrder = async (req, res) => {
  /*
  Test post to http://localhost:5000/api/orders

  {
    "purchaser": "616584cf8b04b9069807c7af",
    "products": [
        {
            "productId":"61658a1c2e620ab1b18dd34a",
            "quantity":1,
            "productPrice":400
        }
    ],
    "orderTotal": 400,
    "freight":20,
    "status": 0,
    "address": {
        "zip": "12345",
        "city": "Gotham",
        "street": "Waynestreet",
        "houseNumber": 10
    },
    "contact": {
        "tel": 555555123,
        "email": "kweku@gmail.com"
    }
}
  */

  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        order: newOrder
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: 'Oops! Something went wrong.',
    });
  }
};