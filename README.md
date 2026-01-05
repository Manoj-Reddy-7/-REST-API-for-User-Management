# User Management System – Node.js & MySQL

A **User Management web application** built using **Node.js, Express.js, MySQL, and EJS**.  
This project performs full **CRUD operations** (Create, Read, Update, Delete) on users and demonstrates backend development with database integration.

---

## 🚀 Features

- View total user count (Home page)
- List all users
- Create new users
- Edit existing user details
- Delete users with password verification
- Server-side rendering using EJS
- MySQL database integration
- Method Override for PATCH & DELETE requests
- Fake data generation using Faker.js

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend (Views):** EJS
- **Database:** MySQL
- **Libraries:**  
  - mysql2  
  - method-override  
  - @faker-js/faker  
- **Tools:** VS Code, Git, GitHub

---
## 📂 Project Structure

REST-API-for-User-Management/
│
├── views/
│ ├── home.ejs
│ ├── users.ejs
│ ├── edit.ejs
│ ├── delete.ejs
│ └── newUser.ejs
│
├── public/
│ └── styles/
│
├── index.js
├── package.json
├── package-lock.json
└── README.md




---

## 🔗 Routes & Functionality

| Method | Route | Description |
|------|------|-------------|
| GET | `/` | Home page with total user count |
| GET | `/users` | Display all users |
| GET | `/users/new` | Form to create new user |
| POST | `/users/post` | Insert new user into database |
| GET | `/users/:id/edit` | Edit user form |
| PATCH | `/users/:id` | Update user name (password protected) |
| GET | `/users/:id/delete` | Delete confirmation page |
| DELETE | `/users/:id` | Delete user (password protected) |

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  Password VARCHAR(255)
);





🎯 Learning Outcomes

Built a CRUD-based user management system

Used MySQL with Node.js (mysql2)

Learned method-override for PATCH & DELETE

Implemented EJS server-side rendering

Understood database queries & routing

Practiced real-world backend development
## 📂 Project Structure

