# New Habit

Used to create a new habit.

**URL** : `/habits/new`

**Method** : `POST`

**Auth required** : YES

`header: {
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}`

**Data constraints**

```json
{
    "name": "[new habit name in plain text]"
}
```

Optional: `userId` parameter, otherwise defaults to logged in user

**Data example**

```json
{
    "name": "jogging"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
[
  {
    "id": 1,
    "name": "jogging",
    "createdOn": "2019-09-25",
    "userId": 1
  }
]
```

## Error Response

**Condition** : If 'name' is missing in the request body.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "message": "Server error adding a new habit"
}
```
