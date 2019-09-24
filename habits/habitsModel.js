const db = require('../database/dbConfig.js');

module.exports = {
  createHabit
}

// takes in new habit object (name, userId) and returns the created habit object
async function createHabit(habitData) {
  // return db('habits').insert(habitData);
  const [id] = await db('habits').insert(habitData);
  const {userId} = habitData;
  return singleHabit({ habitId: id, userId });
}

// takes in an habit ID and user ID and returns the habit object and all the completion records
function singleHabit(habitData) {
  const {userId} = habitData;
  const id = habitData.habitId;
  return db('habits').where({id, userId}).first();
}