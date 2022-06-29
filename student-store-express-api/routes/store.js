const express = require('express');
const router = express.Router();
const { storage } = require('../data/storage');

router.get("/", (req, res) => {
  res.status(200).json({products: storage.get("products")});
})

router.get("/:productId", (req, res) => {
  res.status(200).json({products: storage.get("products")});
})

module.exports = router;