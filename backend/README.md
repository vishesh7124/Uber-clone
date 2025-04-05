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

# /users/login Endpoint Documentation

## Description
This endpoint authenticates an existing user. It validates the user's email and password, then returns a JSON Web Token along with the user details upon successful authentication.

## Request
**Method:** POST  
**Endpoint:** `/users/login`

### Request Body
- `email`: Valid email address (required).
- `password`: String (min 6 characters, required).

**Example:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Response

### Success
- **Status Code:** 200 OK
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

### Authentication Error
- **Status Code:** 401 Unauthorized
- **Response Body:**
```json
{
  "message": "Invalid email or password"
}
```

# /users/logout Endpoint Documentation

## Description
This endpoint logs out an authenticated user by clearing the token cookie and blacklisting the provided token.

## Request
**Method:** GET  
**Endpoint:** `/users/logout`

## Response

### Success
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "message": "Logged out successfully"
}
```

# /captain/register Endpoint Documentation

## Description
This endpoint registers a new captain. It validates the captain's data including personal details, credentials, and vehicle information, then returns a JSON Web Token along with the captain details upon successful registration.

## Request
**Method:** POST  
**Endpoint:** `/captain/register`

### Request Body
- `email`: Valid email address (required).
- `fullname`: Object containing:
  - `firstname`: String (min 3 characters, required).
  - `lastname`: String (optional; if provided, min 3 characters).
- `password`: String (min 6 characters, required).
- `vehicle`: Object containing:
  - `color`: String (min 3 characters, required).
  - `plate`: String (min 3 characters, required, unique).
  - `capacity`: Number (required, minimum 1).
  - `vehicleType`: Must be either "car", "motorcycle", or "auto" (required).

**Example:**
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Response

### Success
- **Status Code:** 201 Created
- **Response Body:**
```json
{
  "token": "generated_jwt_token",
  "captain": { /* captain details except for password */ }
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

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60a7c0d214d1f00abc123456",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```
