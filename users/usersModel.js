const db = require('../database/dbConfig.js');

module.exports = {
  findById,
  findBy,
  insertNew,
  selectAll
}

function findById(id) {
  return null;
}

function findBy(filter) {
  return null;
}

function insertNew(user) {
  return db('users').insert(user)
}

function selectAll() {
  return null;
}