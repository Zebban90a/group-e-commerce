const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} = require("../controllers/ProductController");
//const {isLoggedIn} = require("../middleware/authtentication")

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
