# All

Get a list of all habits and completion records for the logged in user

**URL** : `/habits/all`

**Method** : `GET`

**Auth required** : YES

`header: {
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}`

**Data constraints**

Required: none

Optional: `userId`, defaults to currently logged in user if not provided

```json
{
    "userId": [userId as integer]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "id": 1,
    "name": "reading",
    "createdOn": "2019-09-26",
    "userId": 1,
    "habitRecords": [
      {
        "id": 1,
        "completed": 1,
        "date": "2019-09-24",
        "habitId": 1
      },
      {
        "id": 4,
        "completed": 1,
        "date": "2019-09-25",
        "habitId": 1
      }
    ]
  },
  {
    "id": 2,
    "name": "jogging",
    "createdOn": "2019-09-26",
    "userId": 1,
    "habitRecords": [
      {
        "id": 2,
        "completed": 1,
        "date": "2019-09-24",
        "habitId": 2
      },
      {
        "id": 3,
        "completed": 1,
        "date": "2019-09-25",
        "habitId": 2
      }
    ]
  }
]
```

## Error Response

**Condition** : If the server cannot provide the data

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "message": "Server error getting habit data by user ID"
}
```
