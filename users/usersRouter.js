const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// need the users model imported to use db functions in endpoints
const Users = require('./usersModel.js');

// GET provides a list of all the users
router.get('/', (req, res) => {
  Users.selectAll()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).json({message: "Server error getting all users"});
    })
});

// POST requires an object {username, email, password}
router.post('/register', (req, res) => {
  // get the new user object being sent with the request
  const { body } = req;
  // encrypt the password
  body.password = bcrypt.hashSync(body.password, 6);

  // user data is inputted to user model function
  Users.insertNew(body)
    .then(user => {
      if(user) {
        const token = generateToken(user);
        const {id, name} = user;
        res.status(201).json({id, name, token});
      } else {
        res.status(400).json({message: "Something went wrong creating the account"});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error creating the account"});
    })
});

// POST endpoint to login, returns success message and token upon login
router.post('/login', (req, res) => {
  const {email, password} = req.body;

  Users.findBy({email})
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        const {id, name} = user;
        res.status(200).json({id, name, token});
      } else {
        res.status(400).json({message: "The email or password is incorrect"});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error searching user"});
    })
});

// GET requires an ID parameter and returns user if exists
router.get('/:id', (req, res) => {
  const {id} = req.params;

  Users.findById({id})
    .then(user => {
      if(user) {
        const {name, email, id} = user;
        res.status(200).json({id, name, email});
      } else {
        res.status(400).json({message: "Could not find user by ID"});
      }
    })
    .catch(err => {
      res.status(500).json({message: "Server error searching user"});
    })
});

// takes in a user object and returns an encrypted json web token with a head, payload and signature
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
