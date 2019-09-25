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
async function singleHabit(id) {
  var habitObject = await db('habits').where({id});
  var habitsRecords = await db('habit_records').where('habitId', id).select('completed', 'date');
  if(habitObject.length < 1) {
    return null;
  } else {
    habitObject[0].habitsRecords = habitsRecords;
    return habitObject;
  }
}

// takes in a user ID and returns all habits associated with the user
function getHabits(userId) {
  return db('habits').where({userId});
}