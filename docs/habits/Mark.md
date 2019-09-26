# Mark

Used to update or create a habit record by logged in userId and a provided habit ID. Optionally you could provide a date not to use today as the default.

**URL** : `/habits/mark`

**Method** : `POST`

**Auth required** : YES

`header: {
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}`

**Data constraints**

```json
{
    "habitId": "[habitId as an integer]"
}
```

Optional: `date` parameter, otherwise defaults to todays date
Optional: `completed` parameter set to `0` or `1`, otherwise defaults to completed `1`

**Data example**

```json
{
    "habitId": 12
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

If a new record was created:
```json
{
  "message": "created"
}
```

If a existing record was updated:
```json
{
  "message": "updated"
}
```

## Error Response

**Condition** : If 'habitId' is missing in the request body.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "message": "Server error getting marking habit by ID and date"
}
```
**Condition** : If 'habitId' does not exist.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "message": "HabitId does not exist"
}
```
