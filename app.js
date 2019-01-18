'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

const jsonParser = require('body-parser').json;
const logger = require('morgan');
const mongoose = require('mongoose');
const db = mongoose.connection;

app.use(logger('dev'));
app.use(jsonParser());

mongoose.connect('mongodb://localhost:27017/qa');

db.on('error', function (err) {
  console.error(`connection error: ${err}`);
});

db.once('open', function () {
  console.log('db connection sucessful');
});

app.use('/questions', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});