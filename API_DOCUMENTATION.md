# 📡 API Documentation

Complete REST API documentation for the Mental Health Support Network platform.

**Base URL**: `http://localhost:3001`

---

## Table of Contents

- [Authentication](#authentication)
- [Appointments](#appointments)
- [Counselors](#counselors)
- [Messages](#messages)
- [Profile](#profile)
- [Music](#music)
- [Error Handling](#error-handling)
- [Status Codes](#status-codes)

---

## Authentication

### Register New User

Create a new user account.

**Endpoint**: `POST /register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (201):
```json
{
  "Status": "Success",
  "message": "User registered successfully!"
}
```

**Error Response** (400):
```json
{
  "Status": "Failed",
  "message": "Email already registered"
}
```

---

### Login User

Authenticate user and receive JWT token.

**Endpoint**: `POST /login`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (200):
```json
{
  "Status": "Success",
  "userId": "507f1f77bcf86cd799439011",
  "role": "employee",
  "username": "John Doe",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:

404 - User not found:
```json
{
  "Status": "Failed",
  "message": "No record existed"
}
```

401 - Wrong password:
```json
{
  "Status": "Failed",
  "message": "Incorrect Password"
}
```

---

### Reset Admin Credentials

Reset admin account to default credentials (development only).

**Endpoint**: `POST /reset-admin`

**Request Body**: None

**Success Response** (200):
```json
{
  "Status": "Success",
  "message": "Admin account reset successfully",
  "email": "admin@mindwell.com",
  "password": "Admin123!"
}
```

---

## Appointments

### Get All Appointments

Retrieve appointments. Can filter by email using query parameter.

**Endpoint**: `GET /appointments`

**Query Parameters**:
- `email` (optional): Filter appointments by user email

**Example Requests**:
```
GET /appointments
GET /appointments?email=john.doe@example.com
```

**Success Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "mode": "online",
    "counselor": "Dr. Ashani Dias",
    "notes": "Anxiety issues",
    "startAt": "2026-03-15T10:00:00.000Z",
    "createdAt": "2026-03-06T08:30:00.000Z",
    "updatedAt": "2026-03-06T08:30:00.000Z"
  }
]
```

---

### Create Appointment

Book a new appointment with a counselor.

**Endpoint**: `POST /appointments`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "mode": "online",
  "counselor": "Dr. Ashani Dias",
  "notes": "Need help with anxiety management",
  "startAt": "2026-03-15T10:00:00.000Z"
}
```

**Field Validations**:
- `name`: Required, string
- `email`: Required, string, valid email format
- `phone`: Required, string
- `mode`: Required, enum ["online", "inperson"]
- `counselor`: Required, string
- `notes`: Optional, string
- `startAt`: Required, ISO 8601 date string

**Success Response** (201):
```json
{
  "message": "Appointment booked successfully!",
  "appointment": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "mode": "online",
    "counselor": "Dr. Ashani Dias",
    "notes": "Need help with anxiety management",
    "startAt": "2026-03-15T10:00:00.000Z",
    "createdAt": "2026-03-06T08:30:00.000Z",
    "updatedAt": "2026-03-06T08:30:00.000Z"
  }
}
```

---

### Update Appointment

Update an existing appointment.

**Endpoint**: `PUT /appointments/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the appointment

**Request Body**: (all fields optional)
```json
{
  "mode": "inperson",
  "notes": "Updated notes",
  "startAt": "2026-03-16T14:00:00.000Z"
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "mode": "inperson",
  "counselor": "Dr. Ashani Dias",
  "notes": "Updated notes",
  "startAt": "2026-03-16T14:00:00.000Z",
  "createdAt": "2026-03-06T08:30:00.000Z",
  "updatedAt": "2026-03-06T09:15:00.000Z"
}
```

**Error Response** (404):
```json
{
  "error": "Appointment not found"
}
```

---

## Counselors

### Get All Counselors

Retrieve all counselor profiles.

**Endpoint**: `GET /counselors`

**Success Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Dr. Ashani Dias",
    "category": "Grief & Loss",
    "experience": "12 years",
    "languages": "English, Sinhala",
    "approach": "Narrative Therapy, Supportive Counseling",
    "quote": "Supporting you through loss with empathy, patience, and presence.",
    "rating": 3,
    "image": "/assets/image28.jpg",
    "createdAt": "2026-03-06T08:00:00.000Z",
    "updatedAt": "2026-03-06T08:00:00.000Z"
  }
]
```

---

### Add Counselor

Add a new counselor profile (Admin only).

**Endpoint**: `POST /counselors`

**Request Body**:
```json
{
  "name": "Dr. Jane Smith",
  "category": "Family Therapy",
  "experience": "8 years",
  "languages": "English",
  "approach": "Systems Theory",
  "quote": "Building stronger family bonds",
  "rating": 5,
  "image": "/assets/newcounselor.jpg"
}
```

**Success Response** (201):
```json
{
  "message": "Counselor added successfully!",
  "counselor": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Dr. Jane Smith",
    "category": "Family Therapy",
    "experience": "8 years",
    "languages": "English",
    "approach": "Systems Theory",
    "quote": "Building stronger family bonds",
    "rating": 5,
    "image": "/assets/newcounselor.jpg",
    "createdAt": "2026-03-06T10:00:00.000Z",
    "updatedAt": "2026-03-06T10:00:00.000Z"
  }
}
```

---

### Update Counselor

Update counselor profile (Admin only).

**Endpoint**: `PUT /counselors/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the counselor

**Request Body**: (all fields optional)
```json
{
  "experience": "9 years",
  "rating": 5
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Dr. Jane Smith",
  "category": "Family Therapy",
  "experience": "9 years",
  "languages": "English",
  "approach": "Systems Theory",
  "quote": "Building stronger family bonds",
  "rating": 5,
  "image": "/assets/newcounselor.jpg",
  "createdAt": "2026-03-06T10:00:00.000Z",
  "updatedAt": "2026-03-06T11:30:00.000Z"
}
```

---

### Delete Counselor

Remove a counselor profile (Admin only).

**Endpoint**: `DELETE /counselors/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the counselor

**Success Response** (200):
```json
{
  "message": "Counselor deleted successfully!"
}
```

**Error Response** (404):
```json
{
  "error": "Counselor not found"
}
```

---

### Seed Counselors

Populate database with default counselor profiles.

**Endpoint**: `POST /seed-counselors`

**Request Body**: None

**Success Response** (200):
```json
{
  "Status": "Success",
  "message": "Counselors seeded successfully",
  "count": 12
}
```

---

## Messages

### Get All Messages

Retrieve all support messages.

**Endpoint**: `GET /messages`

**Success Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "message": "I need help with appointment scheduling",
    "date": "2026-03-06T08:30:00.000Z"
  }
]
```

---

### Send Message

Submit a new support message.

**Endpoint**: `POST /messages`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "I need help with appointment scheduling"
}
```

**Success Response** (201):
```json
{
  "message": "Message saved successfully!"
}
```

---

### Update Message

Update a support message.

**Endpoint**: `PUT /messages/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the message

**Request Body**:
```json
{
  "message": "Updated message content"
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "Updated message content",
  "date": "2026-03-06T08:30:00.000Z"
}
```

---

### Delete Message

Remove a support message.

**Endpoint**: `DELETE /messages/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the message

**Success Response** (200):
```json
{
  "message": "Message deleted successfully!"
}
```

---

## Profile

### Get User Profile

Retrieve user profile by ID.

**Endpoint**: `GET /profile/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the user

**Success Response** (200):
```json
{
  "Status": "Success",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "bio": "Mental health advocate",
    "specialization": "Clinical Psychology",
    "experience": "5 years",
    "qualification": "PhD in Psychology",
    "profileImage": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "role": "employee",
    "createdAt": "2026-03-01T00:00:00.000Z",
    "updatedAt": "2026-03-06T10:00:00.000Z"
  }
}
```

**Error Response** (404):
```json
{
  "Status": "Failed",
  "message": "User not found"
}
```

---

### Update User Profile

Update user profile information.

**Endpoint**: `PUT /profile/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the user

**Request Body**: (all fields optional)
```json
{
  "name": "John Doe Updated",
  "phone": "+1234567890",
  "bio": "Passionate about mental health awareness",
  "specialization": "Clinical Psychology",
  "experience": "6 years",
  "qualification": "PhD in Clinical Psychology",
  "profileImage": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Success Response** (200):
```json
{
  "Status": "Success",
  "message": "Profile updated successfully!",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe Updated",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "bio": "Passionate about mental health awareness",
    "specialization": "Clinical Psychology",
    "experience": "6 years",
    "qualification": "PhD in Clinical Psychology",
    "profileImage": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "role": "employee",
    "createdAt": "2026-03-01T00:00:00.000Z",
    "updatedAt": "2026-03-06T11:00:00.000Z"
  }
}
```

---

## Music

### Get All Music

Retrieve all music tracks.

**Endpoint**: `GET /music`

**Success Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Peaceful Morning",
    "artist": "Relaxation Sounds",
    "audioData": "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAA...",
    "mimeType": "audio/mpeg",
    "fileSize": "3.5 MB",
    "duration": "4:32",
    "uploadDate": "2026-03-06T08:00:00.000Z"
  }
]
```

---

### Upload Music

Add a new music track (Admin only).

**Endpoint**: `POST /music`

**Request Body**:
```json
{
  "title": "Calming Waves",
  "artist": "Nature Sounds",
  "audioData": "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAA...",
  "mimeType": "audio/mpeg",
  "fileSize": "4.2 MB",
  "duration": "5:15"
}
```

**Success Response** (201):
```json
{
  "message": "Music added successfully!",
  "music": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Calming Waves",
    "artist": "Nature Sounds",
    "audioData": "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAA...",
    "mimeType": "audio/mpeg",
    "fileSize": "4.2 MB",
    "duration": "5:15",
    "uploadDate": "2026-03-06T10:00:00.000Z"
  }
}
```

---

### Update Music

Update music track metadata (Admin only).

**Endpoint**: `PUT /music/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the music track

**Request Body**: (all fields optional)
```json
{
  "title": "Updated Title",
  "artist": "Updated Artist"
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Updated Title",
  "artist": "Updated Artist",
  "audioData": "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAA...",
  "mimeType": "audio/mpeg",
  "fileSize": "4.2 MB",
  "duration": "5:15",
  "uploadDate": "2026-03-06T10:00:00.000Z"
}
```

---

### Delete Music

Remove a music track (Admin only).

**Endpoint**: `DELETE /music/:id`

**URL Parameters**:
- `id`: MongoDB ObjectId of the music track

**Success Response** (200):
```json
{
  "message": "Music deleted successfully!"
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Description of what went wrong",
  "details": "Additional technical details (optional)"
}
```

Or:

```json
{
  "Status": "Error",
  "message": "Description of the error"
}
```

---

## Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error occurred |

---

## Authentication Headers

For endpoints requiring authentication (marked as "Admin only" or requiring user context), include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

**Note**: Currently, the API doesn't enforce JWT verification on all endpoints. This is a known limitation and should be addressed before production deployment.

---

## Rate Limiting

Currently, there are no rate limits implemented. Consider adding rate limiting for production deployment.

---

## Data Formats

### Dates
All dates should be in ISO 8601 format:
```
2026-03-15T10:00:00.000Z
```

### Images
Profile images and counselor images are stored as base64-encoded strings:
```
data:image/jpeg;base64,/9j/4AAQSkZJRg...
```

### Audio Files
Music files are stored as base64-encoded audio data:
```
data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAA...
```

---

## Best Practices

1. **Always validate input data** before sending requests
2. **Handle errors gracefully** on the client side
3. **Store JWT tokens securely** (e.g., httpOnly cookies)
4. **Use HTTPS** in production
5. **Implement request timeout** handling
6. **Log requests** for debugging purposes
7. **Sanitize user input** to prevent injection attacks

---

## Example Usage (JavaScript/Axios)

### Login Example
```javascript
import axios from 'axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/login', {
      email,
      password
    });
    
    const { token, userId, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
    throw error;
  }
};
```

### Create Appointment Example
```javascript
const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/appointments',
      appointmentData
    );
    
    return response.data;
  } catch (error) {
    console.error('Booking failed:', error.response.data);
    throw error;
  }
};
```

### Get User Profile Example
```javascript
const getUserProfile = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `http://localhost:3001/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch profile:', error.response.data);
    throw error;
  }
};
```

---

## Support

For API support or bug reports, please open an issue on GitHub or contact support@mindwell.com.

---

**Last Updated**: March 6, 2026
