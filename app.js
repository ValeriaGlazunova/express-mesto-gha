const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.resolve(__dirname, '.build')));

app.listen(PORT, () => {
  console.log('app started', PORT);
});
