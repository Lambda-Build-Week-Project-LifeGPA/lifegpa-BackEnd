const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// import dotenv for the use of enviornment variables
require('dotenv').config();

// import endpoint routers
const usersRouter = require('./users/usersRouter.js');
const habitRouter = require('./habits/habitsRouter.js');

// import authentication middleware
const restrictedMiddleware = require('./auth/restrictedMiddleware.js');

// create the server
const server = express();

// use of middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

// assign routers to server endpoints
server.use('/users', usersRouter);
server.use('/habits', restrictedMiddleware, habitRouter);

// GET request for testing base API url
server.get('/', (req, res) => {
  res.json({ message: "API endpoint is up!"});
});

module.exports = server;
