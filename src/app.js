const express = require('express');

const app = express();

// Middleware

app.use(express.json());

// Routes

app.use('/', require('./routes/home'));

module.exports = app;
