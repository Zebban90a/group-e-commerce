const express = require('express');
const {
  updateUser,
  findUser,
  deleteUser,
} = require('../controllers/UserController');
const { isLoggedIn } = require('../middleware/authentication')

const router = express.Router();

router.route('/').get(isLoggedIn, findUser).patch(isLoggedIn, updateUser)
  .delete(deleteUser);

module.exports = router;
