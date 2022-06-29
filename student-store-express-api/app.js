const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const store = require('./routes/store');
const { storage } = require('./data/storage');
const { NotFoundError } = require('./utils/errors');


app.use(express.json());
app.use(morgan('tiny'));
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({ping: "pong"});
})

app.use('/store', store);

/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
  return next(new NotFoundError())
})

/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app;
