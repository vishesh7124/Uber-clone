# /users/register Endpoint Documentation

## Description
This endpoint registers a new user. It validates the user's data and returns a JSON Web Token along with the user details upon successful registration.

## Request
**Method:** POST  
**Endpoint:** `/users/register`

### Request Body
- `email`: Valid email address (required).
- `fullname`: Object containing:
  - `firstname`: String (min 3 characters, required).
  - `lastname`: String (optional; if provided, min 3 characters).
- `password`: String (min 6 characters, required).

**Example:**
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

## Response

### Success
- **Status Code:** 201 Created
- **Response Body:**
```json
{
  "token": "generated_jwt_token",
  "user": { /* user details except for password */ }
}
```

### Validation Error
- **Status Code:** 400 Bad Request
- **Response Body:**
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

## Example Response

### Successful Registration
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "_id": "60a7c0d214d1f00abc123456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```
