const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  uploadImages
} = require("../controllers/ProductController");
const {isAdmin} = require("../middleware/authtentication")



const router = express.Router();
// TODO add isAdmin and isLogged in later, and test
router.route("/").get(getProducts).post(uploadImages.single('images'), createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
