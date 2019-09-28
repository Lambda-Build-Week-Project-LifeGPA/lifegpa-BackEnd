// require the file that will be tested
const Habits = require('./habitsModel.js');

// require the DB configurations to be able to clear database before each test
const db = require('../database/dbConfig.js');

// describe that I'm testing the habits model
describe('The Habits Model', () => {

  // clear the test database before each run of the tests
  beforeEach(async () => {
    await db('users').truncate();
    await db('habits').truncate();
    await db('habit_records').truncate();
  })

  // test the createHabit function
  describe('the createHabit function', () => {
    it('should insert a new habbit', async () => {
      // test setup
      const userData = {
        name: "Bobby Jones",
        email: "bobby@email.com",
        createdOn: '2019-09-23',
        password: "secure123"
      };
      const insertUser = await db('users').insert(userData);
      const habitData = {
        name: "Jogging",
        userId: 1,
        createdOn: '2019-09-23'
      };
      const habitCreated = await Habits.createHabit(habitData);

      // assertions
      const habits = await db('habits');
      expect(habits.length).toBe(1);
    });
  });
  // test the updateCompletion function
  describe('the updateCompletion function', () => {
    it('should insert a new completion record', async () => {
      // test setup
      const userData = {
        name: "Bobby Jones",
        email: "bobby@email.com",
        createdOn: '2019-09-23',
        password: "secure123"
      };
      const insertUser = await db('users').insert(userData);
      const habitData = {
        name: "Jogging",
        userId: 1,
        createdOn: '2019-09-23'
      };
      const insertHabit = await db('habits').insert(habitData);
      const recordData = {
        completed: 1,
        date: '2019-09-23',
        habitId: 1
      };
      const recordCreated = await Habits.updateCompletion(recordData);

      // assertions
      const records = await db('habit_records');
      expect(records.length).toBe(1);
    });
  });
});