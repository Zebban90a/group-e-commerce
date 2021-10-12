const express = require("express");
const {
  createOrder,
  updateOrder, //Admin Only
  findOrder,
  deleteOrder //Admin Only
} = require("../controllers/OrderController");

const router = express.Router();

router.route("/").post(createOrder);
// router.route("/:id").get(findOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
