const express = require('express');
const {
  updateUser,
  findUser,
} = require('../controllers/UserController');
const { isLoggedIn } = require('../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(isLoggedIn, findUser)
  .patch(isLoggedIn, updateUser);

module.exports = router;
