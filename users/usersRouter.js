const router = require('express').Router();

const Users = require('./usersModel.js');

// test GET endpoint to see if route is configured correctly
router.get('/', (req, res) => {
  res.json({ message: "Users endpoint is up!"});
});

// POST requires an object {username, email, password}

module.exports = router;
