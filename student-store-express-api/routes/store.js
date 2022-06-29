const express = require('express');
const router = express.Router();
const Store = require('../models/store.js');

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

router.post("/", (req, res) => {
  const checkoutForm = req.body;
  const purchase = Store.checkOut(checkoutForm);
  res.status(201).json({ purchase });
})

module.exports = router;