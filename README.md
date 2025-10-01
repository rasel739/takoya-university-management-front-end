# 📚 Takoya University Management System (UMS)

The **Takoya University Management System (UMS)** is a modern full-stack application designed to streamline academic and administrative operations within a university.
It provides dedicated modules for **Admins**, **Faculties**, and **Students** with role-based authentication and authorization.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rasel739/takoya-university-management-front-end.git
cd takoya-university-management-front-end

```

### Frontend Environment

```typescript

NEXT_PUBLIC_API_URL=http://localhost:5000

```

```bash

npm install
yarn install

npm run dev

yarn dev
```

## 🚀 Tech Stack

**Frontend**

- [Next.js 15](https://nextjs.org/) (React 19, TypeScript, Tailwind CSS, Radix UI, Shadcn UI)
- Redux Toolkit for state management
- React Hook Form + Zod/Yup for validation
- Framer Motion for animations
- React Toastify for notifications

**Backend**

- [Express.js](https://expressjs.com/) with TypeScript
- [MongoDB](https://www.mongodb.com/) + Mongoose ORM
- Zod validation
- JWT Authentication (Access & Refresh Tokens)

---

## 🔐 Authentication Service

The authentication service provides login, logout, password management, and role-based access for:

- **Admin** 👨‍💼 – Manage all users, change passwords, limited profile edits.
- **Faculty** 👨‍🏫 – Manage/update their profile, limited editable fields.
- **Student** 🎓 – Manage/update their profile, limited editable fields.

Passwords are stored securely using **bcrypt**.

---

## 📡 API Endpoints

### 👤 Users

- `POST /users/create-student`
- `POST /users/create-faculty`
- `POST /users/create-admin`

### 🎓 Students

- `GET /students`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`

### 👨‍🏫 Faculties

- `GET /faculties`
- `GET /faculties/:id`
- `PATCH /faculties/:id`
- `DELETE /faculties/:id`

### 👨‍💼 Admins

- `GET /admins`
- `GET /admins/:id`
- `PATCH /admins/:id`
- `DELETE /admins/:id`

### 🏫 Academic Semesters

- `POST /academic-semesters/create-semester`
- `GET /academic-semesters`
- `GET /academic-semesters/:id`
- `PATCH /academic-semesters/:id`
- `DELETE /academic-semesters/:id`

### 📖 Academic Departments

- `POST /academic-departments/create-department`
- `GET /academic-departments`
- `GET /academic-departments/:id`
- `PATCH /academic-departments/:id`
- `DELETE /academic-departments/:id`

### 👥 Academic Faculties

- `POST /academic-faculties/create-faculty`
- `GET /academic-faculties`
- `GET /academic-faculties/:id`
- `PATCH /academic-faculties/:id`
- `DELETE /academic-faculties/:id`

### 🔑 Authentication

- `POST /auth/login`
- `POST /auth/change-password`
- `POST /auth/refresh-token`

---
