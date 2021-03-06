# User

Used to get a list of all the habits (no completion records) by a userId.

**URL** : `/habits/user`

**Method** : `GET`

**Auth required** : YES

`header: {
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}`

**Data constraints**

Required: none

Optional: `userId` parameter, otherwise defaults to logged in user

**Data example**

```json
{
    "userId": 1
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "id": 1,
    "name": "example habit 1",
    "createdOn": "2019-09-23",
    "userId": 1
  },
  {
    "id": 2,
    "name": "example habit 2",
    "createdOn": "2019-09-24",
    "userId": 1
  },
]
```

## Error Response

**Condition** : If userId selected has no habits or does not exist

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "habits": 0
}
```
