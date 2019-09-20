const router = require('express').Router();

const Users = require('./usersModel.js');

// test GET endpoint to see if route is configured correctly
router.get('/', (req, res) => {
  res.json({ message: "Users endpoint is up!"});
});

// POST requires an object {username, email, password}
router.post('/', (req, res) => {
  // get the new user object being sent with the request
  const { body } = req;

  // user data is inputted to user model function
  Users.insertNew(body)
    .then(user => {
      if(user) {
        res.status(201).json({message: "The account has been created!"});
      } else {
        res.status(500).json({message: "Something went wrong creating the account"});
      }
    })
    .catch(err => {
      console.log('this is the error', err);
      res.status(500).json({message: "Server error creating the account"});
    })
});

module.exports = router;
