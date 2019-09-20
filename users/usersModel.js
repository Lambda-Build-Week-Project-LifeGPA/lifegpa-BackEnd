const db = require('../database/dbConfig.js');

module.exports = {
  findById,
  findBy,
  insertNew,
  selectAll
}

function findById(id) {
  return db('users').select('id', 'name', 'email').where({id}).first();
}

function findBy(filter) {
  return null;
}

async function insertNew(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function selectAll() {
  return null;
}