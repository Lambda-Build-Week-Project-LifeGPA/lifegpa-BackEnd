const db = require('../database/dbConfig.js');

module.exports = {
  createHabit,
  singleHabit,
  getHabits
}

// takes in new habit object (name, userId) and returns the created habit object
async function createHabit(habitData) {
  // return db('habits').insert(habitData);
  const [id] = await db('habits').insert(habitData);
  const {userId} = habitData;
  return singleHabit(id);
}

// takes in an habit ID and user ID and returns the habit object and all the completion records
function singleHabit(id) {
  return db('habits').where({id}).first();
}

// takes in a user ID and returns all habits associated with the user
function getHabits(userId) {
  return db('habits').where({userId});
}