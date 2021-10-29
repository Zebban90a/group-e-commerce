const User = require('../models/UserModel');

exports.updateUser = async (req, res) => {
  const { _id } = req.user;
  const data = req.body;
  const {
    fullName, email, street, houseNumber, tel, zip, city,
  } = data;

  const deployData = {
    fullName,
    email,
    contactInfo: {
      tel,
      address: {
        street,
        houseNumber,
        zip,
        city,
      },
    },
  };

  try {
    const user = await User.findByIdAndUpdate(_id, deployData, {
      new: true,
      runValidators: true,
    });
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

// Not implemented - for future use
exports.deleteUser = async (req, res) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndDelete(_id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.findUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
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
