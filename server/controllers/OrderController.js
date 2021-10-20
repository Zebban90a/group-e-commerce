const Order = require('../models/OrderModel');

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
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Oops! Something went wrong.',
    });
  }
};

exports.findAllOrders = async (req, res) => {
  const user = req.user || { // TODO remove test json
    _id: '616584cf8b04b9069807c7af',
    fullName: 'Kakan Moses',
    email: 'kwekan2@hotmail.com',
    contactInfo: {
      tel: 1234,
      address: {
        city: 'Stockholm',
        street: 'studentbacken',
        houseNumber: '32',
        _id: {
          $oid: '616584cf8b04b9069807c7b1',
        },
      },
      _id: {
        $oid: '616584cf8b04b9069807c7b0',
      },
    },
    __v: 0,
    roles: {
      isAdmin: true,
    },
  };

  try {
    const { isAdmin } = user.roles;
    let orders;
    if (isAdmin) {
      orders = await Order.find({});
    } else {
      orders = await Order.find({
        purchaser: user._id,
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Oops! Something went wrong.',
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.status;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, {
      status: newStatus,
    }, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        updatedOrder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Oops! Something went wrong.',
    });
  }
};

exports.addToCart = async (req,res) => {
  console.log(req.body.id);
  console.log(res.locals.user);
};
