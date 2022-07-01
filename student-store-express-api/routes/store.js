const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Store = require('../models/store.js');
const { BadRequestError } = require('../utils/errors.js');

const transport = {
  //this is the authentication for sending email.
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.SMTP_TO_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    //if error happened code ends here
    console.error(error);
  } else {
    //this means success
    console.log('Ready to send mail!');
  }
});

router.get('/', async (req, res) => {
  const products = Store.getProducts();
  res.status(200).json({ products });
});

router.get('/purchases', (req, res) => {
  if (req.query.email) {
    const purchase = Store.getProductByEmail(req.query.email);
    res.status(200).json({ purchase });
  } else {
    const purchases = Store.getPurchases();
    res.status(200).json({ purchases });
  }
});

router.delete('/purchases/:id', async (req, res) => {
  const purchase = Store.deletePurchase(req.params.id);
  res.status(200).json({ purchase });
});

router.get('/purchases/:purchaseId', (req, res) => {
  const purchaseId = req.params.purchaseId;
  const purchase = Store.getPurchaseById(purchaseId);
  res.status(200).json({ purchase });
});

router.get('/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = Store.getProductById(productId);
  res.status(200).json({ product });
});

router.post('/', (req, res) => {
  if (!req.body) {
    return next(new BadRequestError('Missing body'));
  }
  if (!req.body.shoppingCart) {
    return next(new BadRequestError('Missing shopping cart'));
  }
  if (!req.body.user) {
    return next(new BadRequestError('Missing user'));
  }
  const checkoutForm = req.body;
  const purchase = Store.checkOut(checkoutForm);
  res.status(201).json({ purchase });
});

module.exports = router;
