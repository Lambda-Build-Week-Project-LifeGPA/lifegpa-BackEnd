const db = require('../database/dbConfig.js');

module.exports = {
  findById,
  findBy,
  insertNew,
  selectAll
}

// takes in a user ID and returns the user data
function findById(id) {
  return db('users').where(id).first();
}

// takes in any users db parameter as a filter and returns the user data
function findBy(filter) {
  return db('users').where(filter).first();
}

// takes in a new user object (name, email, password) and returns the created user data
async function insertNew(user) {
  const [id] = await db('users').insert(user);
  return findById({id});
}

// returns the id, name, email for all the users in the database
function selectAll() {
  return db('users').select('id', 'name', 'email', 'createdOn');
}