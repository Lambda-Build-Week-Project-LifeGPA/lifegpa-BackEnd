# Tables:

Users
Habits
HabitRecords

## Relationships

(One) Users <==> Habits (Many)
(One) Habits <==> HabitRecords (Many)

# Table Details

users:
- id (primary key)
- name (string, 128 char.)
- email (unique, string, 128 char.)
- password (string, 512)

habits:
- id (primary key)
- name (string, 128 char.)
- createdOn
- userId (foreign key)

habit_records:
- id (primary key)
- completedOn (date) 
- habitId (foreign key)

## Endpoints Needed

### \users

POST: \register to register new user
POST: \login to login new user
GET: \ to get a list of users
GET: \:id get a specific user by ID

### \habits

POST: \ to create new habit
POST: \mark to create a new completion record on a habit by user and habit ID
GET: \ to get a list of all habits by user ID
GET: \all to get a list of all habits and all completion records by user ID
GET: \day to get a list of all habits and completion records by user ID for entered day (default today)
GET: \single to get a specific habit by ID and all the completion records
