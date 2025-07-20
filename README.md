# 📒 Notes-Api

A simple and secure backend API built with Node.js, Express, and MongoDB that allows users to register, log in, and manage their personal notes.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 🔑 Password hashing using bcrypt
- 📝 Create, Read, Update, and Delete notes
- ⚙️ Protected routes using middleware
- 📦 MongoDB + Mongoose integration
- 🧹 Clean and minimal structure

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- cookie-parser

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/Notes-Api.git
cd Notes-Api
npm install
Create a .env file in the root directory and add:
---
MONGO_DB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=2000
---
##  How to Start
Start the server:
node index.js or npx nodemon index.js
API will be running at:
http://localhost:2000
## 📮 API Endpoints
**Method**      | **Route**          |	**Description**
POST	          | /api/register	     |  Register new user
POST	          | /api/login	       |  Login user (JWT token)


**Method**      | **Route**          |	**Description**
POST	          | /api/note/create	 |  Create a new note
GET	            | /api/note/notelist |  Get all user notes
PUT	            | /api/note/:id	     |  Update note by ID
DELETE          | /api/note/:title	 |  Delete note by title

⚠️ All /note routes require a ** valid JWT token ** in the Authorization header.


