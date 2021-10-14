const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} = require("../controllers/ProductController");
const {isAdmin} = require("../middleware/authtentication")



const router = express.Router();

router.route("/").get(isAdmin, getProducts).post(createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
