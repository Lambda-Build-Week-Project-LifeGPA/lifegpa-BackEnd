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
