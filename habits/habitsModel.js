const db = require('../database/dbConfig.js');

module.exports = {
  createHabit,
  singleHabit,
  getHabits,
  getDate,
  updateCompletion
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

// takes in an habit ID and user ID and returns the habit object and all the completion records
async function getDate(userId, date) {
  // SELECT * from habits as h LEFTJOIN habit_records as r WHERE userId = userId
  const returnObject = await db('habits as h')
    .leftJoin('habit_records as r', 'h.id', 'r.habitId')
    .select('h.id', 'h.name', 'h.createdOn', 'r.completed', 'r.date', 'r.habitId');
  console.log(returnObject);

  //  const hs=[]
  //    for(let i = 0; i < returnObject.length; i ++){
  //      let currHbObj = returnObject[i];
  //     if(hs[currHbObj.id]){
  //           //hs[records].push(currHbObj[completed])
  //     }else{
  //       hs.push()
  //     }
  //  }

  return returnObject;

  // return null;

  // var getHabits = await db('habits').where({userId});
  // var habitsRecords = await db('habit_records').where('habitId', id).select('completed', 'date');
  // if(habitObject.length < 1) {
  //   return null;
  // } else {
  //   habitObject[0].habitsRecords = habitsRecords;
  //   return habitObject;
  // }
}

function updateCompletion(habitRecord) {
  return db('habit_records').insert(habitRecord);
}

// takes in a user ID and returns all habits associated with the user
function getHabits(userId) {
  return db('habits').where({userId});
}