const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./usersModel.js');

// test GET endpoint to see if route is configured correctly
router.get('/', (req, res) => {
  res.json({ message: "Users endpoint is up!"});
});

// POST requires an object {username, email, password}
router.post('/', (req, res) => {
  // get the new user object being sent with the request
  const { body } = req;
  // encrypt the password
  body.password = bcrypt.hashSync(body.password, 6);

  // user data is inputted to user model function
  Users.insertNew(body)
    .then(user => {
      if(user) {
        const token = generateToken(user);
        res.status(201).json({message: "The account has been created!", token});
      } else {
        res.status(500).json({message: "Something went wrong creating the account"});
      }
    })
    .catch(err => {
      console.log('this is the error', err);
      res.status(500).json({message: "Server error creating the account"});
    })
});

// GET requires an ID parameter and returns the name and email if user exists
router.get('/:id', (req, res) => {
  const {id} = req.params;

  Users.findById(id)
    .then(user => {
      if(user) {
        res.status(201).json(user);
      } else {
        res.status(500).json({message: "Could not find user by ID"});
      }
    })
    .catch(err => {
      console.log('this is the error', err);
      res.status(500).json({message: "Server error searching user"});
    })
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    name: user.name
  };
  const options = {
    expiresIn: '7d'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
