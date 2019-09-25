const router = require('express').Router();
const {formatDate} = require('../special.js');

// need the habits model imported to use db functions in endpoints
const Habits = require('./habitsModel.js');

// GET habits of a user by userId
router.get('/user', (req, res) => {
  const userId = req.body.userId || req.decodedToken.sub;
  Habits.getHabits(userId)
    .then(result => {
      if(result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(400).json({habits: 0});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error getting all habits by user ID"});
    })
});

// POST create a new habit
router.post('/new', (req, res) => {
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
        res.status(200).json(habit);
      } else {
        res.status(400).json({message: "habit ID is invalid"});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error getting habit data by ID"});
    })
});

// GET a list of all habits and completion records for entered day (default today)
router.get('/day', (req, res) => {
  const userId = req.body.userId || req.decodedToken.sub;
  const newDate = Date.now();
  const date = req.body.date || formatDate(newDate);
  Habits.getDate(userId, date)
    .then(record => {
      if(record) {
        res.status(201).json(record);
      } else {
        res.status(400).json({message: "habit ID is invalid"});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error getting habit data by ID"});
    })
// res.status(200).json({message: "nothing here yet"}); // working on this endpoint
});

router.post('/mark', (req, res) => {
  var {habitId, completed} = req.body;
  const newDate = Date.now();
  const date = req.body.date || formatDate(newDate);
  completed === undefined ? completed = true : completed = completed;
  Habits.updateCompletion({completed, date, habitId})
    .then(record => {
      if(record) {
        res.status(201).json(record);
      } else {
        res.status(400).json({message: "habit ID is invalid"});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error getting habit data by ID"});
    })
});

module.exports = router;