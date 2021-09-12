const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
