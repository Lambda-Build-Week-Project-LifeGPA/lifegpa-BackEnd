# Single

Used to get a habit by ID and a list of all it's completion records.

**URL** : `/habits/single/:id`

**Method** : `GET`

**Auth required** : YES

`header: {
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}`

**Data constraints**

Required: include the habit ID in the request URL

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "id": 1,
    "name": "sample habit 1",
    "createdOn": "2019-09-24",
    "userId": 1,
    "habitsRecords": [
      {
        "completed": 1,
        "date": "2019-09-25"
      },
      {
        "completed": 1,
        "date": "2019-09-24"
      }
    ]
  }
]
```

## Error Response

**Condition** : If habit ID is selected that does not exist

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "habit ID is invalid"
}
```
