# UCAMP Frontend

UCAMP Frontend is a React-based client application for the UCAMP project.  
It connects with the Spring Boot backend (`ucamp-api`) and provides authentication, board CRUD, and routing features.

---

## Features

- User login with JWT authentication
- Logout
- Board list page
- Board detail page
- Create board
- Update board
- Delete board
- Protected routes with React Router

---

## Tech Stack

- React
- Vite
- React Router DOM
- JavaScript
- LocalStorage (JWT storage)

---

## Pages

- `/login` : login page
- `/boards` : board list + board create
- `/boards/:id` : board detail page

---

## Project Structure

```bash
src/
├─ components/
│  ├─ LoginSection.jsx
│  ├─ BoardCreateSection.jsx
│  └─ BoardList.jsx
├─ pages/
│  ├─ LoginPage.jsx
│  ├─ BoardPage.jsx
│  └─ BoardDetailPage.jsx
├─ App.jsx
└─ main.jsx
