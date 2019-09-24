const router = require('express').Router();
const {formatDate} = require('../special.js');

// need the habits model imported to use db functions in endpoints
const Habits = require('./habitsModel.js');

// GET tests if route is up
router.get('/', (req, res) => {
  // if passed authentication it should state that it's authenticated
  res.status(201).json("The habits endpoint is up and running!");
});

// POST create a new habit
router.post('/', (req, res) => {
  const newDate = Date.now();
  req.body.createdOn = formatDate(newDate);
  Habits.createHabit(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({message: "Server error adding a new habit"});
    })
});

module.exports = router;