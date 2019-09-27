# Users

Used to get all the registered users

**URL** : `/users/`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

Required: none

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "id": 1,
    "name": "Robert",
    "email": "Robert@email.com",
    "createdOn": "2019-09-26"
  },
  {
    "id": 1,
    "name": "Alex",
    "email": "Alex@email.com",
    "createdOn": "2019-09-26"
  }
]
```

## Error Response

**Condition** : If the server cannot provide the list

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "message": "Server error getting all users"
}
```
