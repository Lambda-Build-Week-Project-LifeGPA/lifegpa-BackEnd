const router = require('express').Router();

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
  console.log("how about this date?", formatDate(newDate));
  req.body.createdOn = formatDate(newDate);
  Habits.createHabit(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({message: "Server error adding a new habit"});
    })
});

// format the date into the needed format YYYY-MM-DD
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

module.exports = router;