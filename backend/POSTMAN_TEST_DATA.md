# Postman Test Data for Beast Burger API

## Base URL
```
http://localhost:8080
```

---

## 1. Register Customer User

**POST** `/api/users/register`

### Request Body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+1 (555) 123-4567"
}
```

### Expected Response (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1 (555) 123-4567",
      "role": "Customer",
      "status": "Active"
    }
  }
}
```

---

## 2. Register Admin User

**POST** `/api/users/register`

### Request Body:
```json
{
  "name": "Admin User",
  "email": "admin@beastburger.com",
  "password": "admin123",
  "phone": "+1 (555) 999-9999"
}
```

### After Registration:
You'll need to manually update the role in MongoDB or create an update endpoint. For now, you can use MongoDB Compass or mongo shell:

```javascript
db.users.updateOne(
  { email: "admin@beastburger.com" },
  { $set: { role: "Admin" } }
)
```

---

## 3. Login Customer User

**POST** `/api/users/login`

### Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Expected Response (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1 (555) 123-4567",
      "role": "Customer",
      "status": "Active",
      "address": {
        "street": "",
        "city": "",
        "state": "",
        "zipCode": ""
      },
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}
```

---

## 4. Login Admin User

**POST** `/api/users/login`

### Request Body:
```json
{
  "email": "admin@beastburger.com",
  "password": "admin123"
}
```

---

## 5. Get All Users (Admin Only)

**GET** `/api/users`

### Expected Response (200):
```json
{
  "success": true,
  "count": 2,
  "data": {
    "users": [
      {
        "_id": "...",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1 (555) 123-4567",
        "role": "Customer",
        "status": "Active",
        ...
      },
      {
        "_id": "...",
        "name": "Admin User",
        "email": "admin@beastburger.com",
        "phone": "+1 (555) 999-9999",
        "role": "Admin",
        "status": "Active",
        ...
      }
    ]
  }
}
```

---

## 6. Get User by ID

**GET** `/api/users/:id`

Replace `:id` with actual user ID from registration response.

### Expected Response (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john.doe@example.com",
      ...
    }
  }
}
```

---

## 7. Update User

**PUT** `/api/users/:id`

### Request Body:
```json
{
  "name": "John Updated",
  "phone": "+1 (555) 999-8888",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

### Expected Response (200):
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Updated",
      "phone": "+1 (555) 999-8888",
      "address": {
        "street": "123 Main Street",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001"
      },
      ...
    }
  }
}
```

---

## 8. Get User Profile

**GET** `/api/users/profile/:id`

Replace `:id` with actual user ID.

---

## 9. Delete User (Admin Only)

**DELETE** `/api/users/:id`

Replace `:id` with actual user ID to delete.

### Expected Response (200):
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Test Scenarios

### ✅ Success Cases:
1. Register new customer → Should return 201
2. Login with correct credentials → Should return 200
3. Get user by ID → Should return 200
4. Update user info → Should return 200

### ❌ Error Cases:
1. Register with existing email → Should return 400
2. Login with wrong password → Should return 401
3. Login with non-existent email → Should return 401
4. Get user with invalid ID → Should return 404
5. Register without required fields → Should return 400

---

## Quick Test Users

### Customer 1:
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "jane123",
  "phone": "+1 (555) 234-5678"
}
```

### Customer 2:
```json
{
  "name": "Bob Johnson",
  "email": "bob.johnson@example.com",
  "password": "bob123",
  "phone": "+1 (555) 345-6789"
}
```

### Admin:
```json
{
  "name": "Admin User",
  "email": "admin@beastburger.com",
  "password": "admin123",
  "phone": "+1 (555) 999-9999"
}
```

---

## Postman Collection Setup

1. Create a new collection: "Beast Burger API"
2. Set collection variable: `baseUrl` = `http://localhost:8080`
3. Use `{{baseUrl}}/api/users/...` in requests
4. Save user IDs from responses as environment variables for later requests

