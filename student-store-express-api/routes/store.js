const express = require('express');
const router = express.Router();
const Store = require('../models/Store.js');

router.get("/", async (req, res) => {
  const products = Store.getProducts();
  res.status(200).json({ products });
})

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = Store.getProductById(productId);
  console.log(product);
  res.status(200).json({ product });
})

module.exports = router;