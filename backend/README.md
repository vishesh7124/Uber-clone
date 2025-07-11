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


## Maps Endpoints

### 1. Get Coordinates
Get latitude and longitude coordinates for a given address.

**Endpoint:** `GET /maps/get-coordinates`

**Query Parameters:**
- `address` (string, required): Address to geocode (minimum 3 characters)

**Request Example:**
```bash
curl -X GET "http://localhost:3000/maps/get-coordinates?address=New York, NY" \
  -H "Authorization: Bearer <your-jwt-token>"
```

**Response:**
```json
{
  "lat": 40.7127753,
  "lng": -74.0059728
}
```

**Error Responses:**
- `400 Bad Request`: Invalid or missing address parameter
- `500 Internal Server Error`: Geocoding failed or server error

---

### 2. Get Distance and Time
Calculate distance and travel time between two locations.

**Endpoint:** `GET /maps/get-distance-time`

**Query Parameters:**
- `origin` (string, required): Starting location (minimum 3 characters)
- `destination` (string, required): Ending location (minimum 3 characters)

**Request Example:**
```bash
curl -X GET "http://localhost:3000/maps/get-distance-time?origin=New York, NY&destination=Los Angeles, CA" \
  -H "Authorization: Bearer <your-jwt-token>"
```

**Response:**
```json
{
  "distance": {
    "text": "4,501 km",
    "value": 4501000
  },
  "duration": {
    "text": "1 day 17 hours",
    "value": 147600
  },
  "origin": "New York, NY, USA",
  "destination": "Los Angeles, CA, USA"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid or missing origin/destination parameters
- `500 Internal Server Error`: Distance calculation failed or server error

---

### 3. Get Autocomplete Suggestions
Get place suggestions for autocomplete functionality.

**Endpoint:** `GET /maps/get-suggestions`

**Query Parameters:**
- `input` (string, required): Search query (minimum 3 characters)

**Request Example:**
```bash
curl -X GET "http://localhost:3000/maps/get-suggestions?input=New York" \
  -H "Authorization: Bearer <your-jwt-token>"
```

**Response:**
```json
{
  "suggestions": [
    {
      "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
      "description": "New York, NY, USA",
      "matched_substrings": [
        {
          "length": 8,
          "offset": 0
        }
      ],
      "structured_formatting": {
        "main_text": "New York",
        "main_text_matched_substrings": [
          {
            "length": 8,
            "offset": 0
          }
        ],
        "secondary_text": "NY, USA"
      },
      "types": ["locality", "political"]
    }
  ],
  "status": "OK"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid or missing input parameter
- `500 Internal Server Error`: Autocomplete service failed or server error

---

## Ride Endpoints

### 1. Create Ride
Create a new ride booking with fare calculation.

**Endpoint:** `POST /ride/create`

**Request Body:**
```json
{
  "pickup": "New York, NY",
  "destination": "Brooklyn, NY",
  "vehicleType": "car"
}
```

**Request Parameters:**
- `pickup` (string, required): Pickup location (minimum 3 characters)
- `destination` (string, required): Destination location (minimum 3 characters)
- `vehicleType` (string, required): Vehicle type - must be one of: `auto`, `motorcycle`, `car`

**Request Example:**
```bash
curl -X POST "http://localhost:3000/ride/create" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "pickup": "Times Square, New York, NY",
    "destination": "Brooklyn Bridge, NY",
    "vehicleType": "car"
  }'
```

**Response:**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "user": "64a1b2c3d4e5f6789012340",
  "pickup": "Times Square, New York, NY",
  "destination": "Brooklyn Bridge, NY",
  "fare": 85.50,
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Fare Calculation:**
The fare is calculated based on:

| Vehicle Type | Base Fare | Per KM Rate | Per Minute Rate |
|-------------|-----------|-------------|-----------------|
| Auto        | ₹30       | ₹10         | ₹2              |
| Car         | ₹50       | ₹15         | ₹3              |
| Motorcycle  | ₹20       | ₹8          | ₹1.5            |

**Formula:** `Fare = Base Fare + (Distance in KM × Per KM Rate) + (Duration in Minutes × Per Minute Rate)`

**Error Responses:**
- `400 Bad Request`: Invalid parameters or fare calculation failed
- `500 Internal Server Error`: Ride creation failed or server error

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

or

```json
{
  "message": "Internal Server Error"
}
```

---

## Environment Variables

Make sure to set up the following environment variables:

```env
GOOGLE_MAPS_API=your_google_maps_api_key
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

---

## Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Geocoding API
   - Distance Matrix API
   - Places API
4. Create credentials (API Key)
5. Add the API key to your environment variables

---

## Rate Limits

- Google Maps APIs have usage limits and billing requirements
- Implement caching for frequently requested routes to optimize API usage
- Consider implementing request throttling for production use

---

## Security Notes

- All endpoints require authentication
- API keys are stored as environment variables
- Input validation is implemented on all endpoints
- OTP is excluded from ride responses by default for security

---

# /ride/get-fare Endpoint Documentation

## Description
This endpoint calculates fare estimates for all available vehicle types between two locations. It returns fare calculations for auto, car, and motorcycle without creating an actual ride booking.

## Request
**Method:** GET  
**Endpoint:** `/ride/get-fare`

### Query Parameters
- `pickup` (string, required): Pickup location address (minimum 3 characters)
- `destination` (string, required): Destination location address (minimum 3 characters)

**Note:** This endpoint requires authentication via JWT token in the Authorization header.

## Request Example
```bash
curl -X GET "http://localhost:3000/ride/get-fare?pickup=Times Square, New York, NY&destination=Brooklyn Bridge, NY" \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Response

### Success Response
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "auto": 67.50,
  "car": 95.25,
  "motorcycle": 52.75
}
```

The response contains fare estimates for all three vehicle types:
- `auto`: Fare estimate for auto rickshaw
- `car`: Fare estimate for car
- `motorcycle`: Fare estimate for motorcycle

### Error Responses

#### Validation Error
- **Status Code:** 400 Bad Request
- **Response Body:**
```json
{
  "errors": [
    {
      "msg": "Invalid pickup",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

#### Server Error
- **Status Code:** 500 Internal Server Error
- **Response Body:**
```json
{
  "message": "Error message describing the issue"
}
```

## Fare Calculation Details

The fare calculation is based on distance and time between pickup and destination locations:

### Fare Structure

| Vehicle Type | Base Fare | Per KM Rate | Per Minute Rate |
|-------------|-----------|-------------|-----------------|
| Auto        | ₹30       | ₹10         | ₹2              |
| Car         | ₹50       | ₹15         | ₹3              |
| Motorcycle  | ₹20       | ₹8          | ₹1.5            |

### Formula
```
Fare = Base Fare + (Distance in KM × Per KM Rate) + (Duration in Minutes × Per Minute Rate)
```

### Calculation Process
1. The system uses Google Maps Distance Matrix API to get the distance and duration between pickup and destination
2. Distance is converted from meters to kilometers
3. Duration is converted from seconds to minutes
4. The fare formula is applied for each vehicle type

## Use Cases
- **Fare Estimation**: Allow users to compare prices across different vehicle types before booking
- **Price Transparency**: Show upfront pricing to users
- **Route Planning**: Help users make informed decisions about their travel options

## Authentication
This endpoint requires a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting & Dependencies
- This endpoint depends on Google Maps Distance Matrix API
- Consider implementing caching for frequently requested routes to optimize API usage
- Be mindful of Google Maps API rate limits and billing

## Common Error Scenarios
1. **Missing Authentication**: Returns 401 if no valid JWT token is provided
2. **Invalid Locations**: Returns 500 if pickup or destination cannot be geocoded
3. **Validation Errors**: Returns 400 if pickup/destination are too short or missing
4. **API Service Errors**: Returns 500 if Google Maps API is unavailable or returns an error

## Example Usage Flow
1. User enters pickup and destination addresses
2. Frontend calls `/ride/get-fare` to get price estimates
3. User sees fare comparison for all vehicle types
4. User selects preferred vehicle type
5. Frontend calls `/ride/create` with the selected vehicle type
