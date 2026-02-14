# Mridanga App Backend

A MERN stack backend for the Mridanga learning application.

## 🚀 What is MERN Stack?

MERN stands for:
- **M**ongoDB - Database to store data
- **E**xpress.js - Web framework for Node.js
- **R**eact - Frontend (already built)
- **N**ode.js - JavaScript runtime

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── contactController.js # Contact form logic
│   └── registrationController.js # Student registration logic
├── models/
│   ├── Contact.js          # Contact form schema
│   └── Registration.js          # Student registration schema
├── routes/
│   ├── contact.js          # Contact API routes
│   └── registration.js          # Registration API routes
├── middleware/             # Future middleware
├── env.example            # Environment variables template
├── package.json           # Dependencies and scripts
├── server.js              # Main server file
└── README.md              # This file
```