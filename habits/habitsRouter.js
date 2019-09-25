const router = require('express').Router();
const {formatDate} = require('../special.js');

// need the habits model imported to use db functions in endpoints
const Habits = require('./habitsModel.js');

// GET habits of a user by userId
router.get('/user', (req, res) => {
  const userId = req.body.userId || req.decodedToken.sub;
  Habits.getHabits(userId)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({message: "Server error getting all habits by user ID"});
    })
});

// POST create a new habit
router.post('/', (req, res) => {
  const newDate = Date.now();
  req.body.createdOn = formatDate(newDate);
  req.body.userId = req.body.userId || req.decodedToken.sub;
  Habits.createHabit(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "Server error adding a new habit"});
    })
});

// GET a single habit by habitId returning it and all it's completion records
router.get('/single/:id', (req, res) => {
  const {id} = req.params;
  Habits.singleHabit(id)
    .then(habit => {
      if(habit) {
        res.status(201).json(habit);
      } else {
        res.status(400).json({message: "habit ID is invalid"});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error getting habit data by ID"});
    })
});

module.exports = router;