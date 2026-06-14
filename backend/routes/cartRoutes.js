const express = require("express");

const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCartItems);
router.delete("/:id", removeFromCart);

module.exports = router;