const express = require('express');
const {
  createUser,
  updateUser,
  findUser,
  deleteUser,
} = require('../controllers/UserController');

const router = express.Router();

router.route('/').post(createUser);
router.route('/:id').get(findUser).patch(updateUser).delete(deleteUser);

module.exports = router;
