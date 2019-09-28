// require the file that will be tested
const Users = require('./usersModel.js');

// require the DB configurations to be able to clear database before each test
const db = require('../database/dbConfig.js');

// describe that I'm testing the user model
describe('The User Model', () => {

  // clear the test database before each run of the tests
  beforeEach(async () => {
    await db('users').truncate();
  })

  // test the insertNew function
  describe('the insertNew function', () => {
    it('should insert a new user', async () => {
      // test setup
      const userData = {
        name: "John Doe",
        email: "john@email.com",
        createdOn: '2019-09-23',
        password: "secure123"
      };
      const user = await Users.insertNew(userData);

      // assertions
      const users = await db('users');
      expect(users.length).toBe(1);
    });
    it('should result in a newly created user', async () => {
      // test setup
      const userData = {
        name: "John Doe",
        email: "john@email.com",
        createdOn: '2019-09-23',
        password: "secure123"
      };
      const user = await Users.insertNew(userData);

      // assertions
      const users = await db('users');
      expect(users[0]).toEqual({createdOn: "2019-09-23", email: 'john@email.com', id: 1, name: "John Doe", password: "secure123"});
    });
  });

  // test the findById function
  describe('should find a user by id', () => {
    it('should return the user object', async () => {
      // test setup
      const userData = {
        name: "John Doe",
        email: "john@email.com",
        createdOn: '2019-09-23',
        password: "secure123"
      };
      const insertUser = await db('users').insert(userData);

      // assertions
      const user = Users.findById(1)
        .then(result => {
          console.log('result', result);
          expect(result).toEqual({id: 1, username: 'sammy', password: '8^&@hjFRyg98'});
        })
    })
  })
});