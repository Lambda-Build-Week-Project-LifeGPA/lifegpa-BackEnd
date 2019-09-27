const db = require('../database/dbConfig.js');

module.exports = {
  createHabit,
  singleHabit,
  getHabits,
  getDate,
  updateCompletion,
  getAll
}

// takes in new habit object (name, userId) and returns the created habit object
async function createHabit(habitData) {
  // return db('habits').insert(habitData);
  const [id] = await db('habits').insert(habitData);
  const {userId} = habitData;
  return db('habits').where({id});
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

// takes in an user ID and date and returns the habit object and all the completion records
async function getDate(userId, date) {
  const habits = await db('habits').where({userId});
  const habitRecords = habits.map(async (habit) => {
    const records = await db('habit_records').where('habitId', habit.id).andWhere('date', date);
    const h = habit;
    h.habitRecords = records;
    return h;
  })

  console.log("habitRecords", habitRecords);
  return Promise.all(habitRecords);
}

// takes in an user ID and returns all the habit object and all the completion records
async function getAll(userId) {
  const habits = await db('habits').where({userId});
  const habitRecords = habits.map(async (habit) => {
    const records = await db('habit_records').where('habitId', habit.id);
    const h = habit;
    h.habitRecords = records;
    return h;
  })

  console.log("habitRecords", habitRecords);
  return Promise.all(habitRecords);
}

async function updateCompletion(habitRecord) {
  const {completed, date, habitId} = habitRecord;
  // search for an existing record for that date with that habitId
  const lookupRecord = await db('habit_records').where({date, habitId}).first()
    .then(foundMatch => {
      // if record exists
      if(foundMatch) {
        // update it
        const updateObject = db('habit_records').where({id: foundMatch.id}).update({completed: completed})
          .then(complete => {
            return {message: "updated"};
          })
          .catch(err => {
            return {err};
          })
        return updateObject;
    // if the record doesn't exist
      } else {
        // create it
        const insertObject = db('habit_records').insert(habitRecord)
          .then(complete => {
            return {message: "created"};
          })
          .catch(err => {
            return {err};
          })
          return insertObject;
      }
    })
  return lookupRecord;
}

// takes in a user ID and returns all habits associated with the user
function getHabits(userId) {
  return db('habits').where({userId});
}