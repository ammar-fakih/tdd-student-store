const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const store = require('./routes/store');
const { storage } = require('./data/storage');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({message: "welcome"});
})

app.use('/store', store);

module.exports = app;
