# Student Management System — Node.js + React + PostgreSQL

Developed by **Kartikay Srivastava**

---

## Overview

This project is a full-stack CRUD application for managing student/member data. It demonstrates API development, normalized database design, React frontend integration, and RESTful communication with pagination and search functionalities.

---

## Live Deployment

The project is fully deployed and accessible online:

👉 Live Application: https://student-crud-tau.vercel.app/

---

## Features

### Frontend (React + Bootstrap)

- Responsive UI built using React and Bootstrap 5
- CRUD operations: Add, Edit, Delete members
- Pagination and search support
- SweetAlert2 for alerts and confirmations
- Design aligned with assignment UI requirements (green primary color theme)

### Backend (Node.js + Express + PostgreSQL)

- RESTful APIs for all CRUD operations
- Pagination and search implemented at the API level
- Input validation and error handling
- PostgreSQL with normalized schema for `students`, `subjects`, and `marks`
- Connection pooling using `pg` package
- Sample data seeding available

### API Testing

- Postman collection provided (`student_crud_api.postman_collection.json`)
- Covers Create, Read, Update, Delete, and Pagination endpoints
- Includes test scripts for validation

---

## Tech Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | React.js (Vite) + Bootstrap 5 |
| Backend         | Node.js + Express.js          |
| Database        | PostgreSQL                    |
| Testing         | Postman                       |
| Alerts/UI       | SweetAlert2                   |
| Package Manager | npm                           |

---

## Setup Instructions

### Clone the repository

```bash
git clone <repo-url>
cd student-crud
```

### Setup PostgreSQL Database

```bash
sudo -u postgres createdb studentdb
psql -U postgres -d studentdb -f backend/schema.sql
```

### Seed the Database with Sample Data

```bash
cd backend
npm run seed
```

This command inserts 20+ records into the `students`, `subjects`, and `marks` tables for testing.

Alternatively, you can seed manually:

```bash
psql -U postgres -d studentdb -f backend/sample_data.sql
```

### Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Run backend server

```bash
cd backend
npm run dev
```

Server will start on:
`http://localhost:4000`

### Run frontend app

```bash
cd ../frontend
npm run dev
```

Frontend runs on:
`http://localhost:5173`

Open your browser and start managing members.

---

## API Testing

You can test all endpoints using Postman.

### Base URL

```
http://localhost:4000/api
```

### Endpoints

| Operation     | Method   | Endpoint                   | Description                      |
| ------------- | -------- | -------------------------- | -------------------------------- |
| Create Member | `POST`   | `/students`                | Add a new member                 |
| Read Members  | `GET`    | `/students?page=1&limit=5` | Get paginated member list        |
| Search Member | `GET`    | `/students?search=Ravi`    | Search by name/email             |
| Read by ID    | `GET`    | `/students/:id`            | Get details of a specific member |
| Update Member | `PUT`    | `/students/:id`            | Update an existing member        |
| Delete Member | `DELETE` | `/students/:id`            | Delete member by ID              |

---

## API Request Examples

### Create Member

**POST** `/api/students`

```json
{
  "first_name": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "age": 22,
  "parent_id": 3
}
```

### Get All Members (with Pagination)

**GET** `/api/students?page=1&limit=5`

### Update Member

**PUT** `/api/students/1`

```json
{
  "first_name": "Ravi Kumar Updated",
  "email": "ravi.kumar@example.com",
  "age": 19,
  "parent_id": 1
}
```

### Delete Member

**DELETE** `/api/students/1`

---

## Database Schema

### students

| Column        | Type               | Description               |
| ------------- | ------------------ | ------------------------- |
| id            | SERIAL PRIMARY KEY | Unique ID                 |
| enrollment_no | VARCHAR(20) UNIQUE | Auto-generated            |
| first_name    | VARCHAR(100)       | Member name               |
| email         | VARCHAR(100)       | Member email              |
| age           | INT                | Member age                |
| parent_id     | INT                | Optional parent reference |
| created_at    | TIMESTAMP          | Record creation date      |
| updated_at    | TIMESTAMP          | Last updated timestamp    |

### subjects

| Column    | Type               | Description       |
| --------- | ------------------ | ----------------- |
| id        | SERIAL PRIMARY KEY | Unique subject ID |
| code      | VARCHAR(20)        | Subject code      |
| name      | VARCHAR(150)       | Subject name      |
| max_marks | INT                | Maximum marks     |

### marks

| Column         | Type               | Description        |
| -------------- | ------------------ | ------------------ |
| id             | SERIAL PRIMARY KEY | Marks ID           |
| student_id     | INT                | FK → students(id)  |
| subject_id     | INT                | FK → subjects(id)  |
| marks_obtained | NUMERIC(6,2)       | Marks scored       |
| grade          | VARCHAR(5)         | Grade (A, B, etc.) |
| exam_date      | DATE               | Exam date          |

---

## Sample Data

The database can be preloaded using `backend/sample_data.sql` or seeded with `npm run seed`. It includes:

- 20 students
- 5 subjects
- 40+ marks entries for pagination and analytics testing

---

## Postman Collection

Import the file: **Student CRUD API Collection.postman_collection.json**

It includes:

- CRUD + Pagination + Search requests
- Sample request bodies
- Automated tests for responses

Run the collection runner — all tests should pass.

---

## Screenshots

| Feature              | Screenshot                      |
| -------------------- | ------------------------------- |
| Members List         | `screenshots/home-page.png`     |
| Add Member Modal     | `screenshots/add-member.png`    |
| Edit Member Modal    | `screenshots/edit-member.png`   |
| Postman Test Results | `screenshots/postman-tests.png` |

---

## Author

**Kartikay Srivastava**
Pune, India
Email: `kartiksrivastava19@gmail.com`
October 2025

---

Thank you for reviewing my submission.
This project demonstrates full-stack development using React, Node.js, and PostgreSQL.
