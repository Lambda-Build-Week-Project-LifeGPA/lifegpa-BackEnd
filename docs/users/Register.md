# Register

Used to create a new user and returns the user's id, name and authentication token.

**URL** : `/users/register`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "name": "[name as a string]",
    "password": "[password in plain text]"
}
```

Optional: `createdOn` parameter defaults to todays date if empty

**Data example**

```json
{
    "username": "johndoe@example.com",
    "name": "John Doe",
    "password": "greatPassword",
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "id": 1,
    "name": "John Doe",
    "createdOn": "2019-09-24",
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3deyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## Error Response

**Condition** : If one of the fields ('email', 'name, 'password') is missing.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": [
        "The email or password is incorrect"
    ]
}
```
