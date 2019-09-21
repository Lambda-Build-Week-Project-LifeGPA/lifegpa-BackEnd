const router = require('express').Router();

// need the habits model imported to use db functions in endpoints
const Habits = require('./habitsModel.js');

// GET tests if route is up
router.get('/', (req, res) => {
  // if passed authentication it should state that it's authenticated
  res.status(201).json("The habits endpoint is up and running!");
});

module.exports = router;