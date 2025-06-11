# RoadTrip Web Application

A full-stack web application for creating, browsing, and managing road trips, with user authentication, trip management, and reviews.

---

## Features

- **User registration and login**
- **Road trip creation, browsing, and management**
- **Location and review management**
- **Authentication and authorization middleware**
- **MongoDB database integration**
- **RESTful API endpoints (backend)**
- **Responsive and interactive frontend built with React**

---

## Tech Stack

### Backend

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **Custom middleware (logging, authentication, error handling)**
- **Postman (for API testing and documentation)**

### Frontend

- **React**
- **React Router**
- **Tailwind CSS**
- **Axios (for API calls)**
- **Context API (for state management)**
- **Responsive design**

---

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** installed and running locally, or a **MongoDB Atlas** account

---

### Backend Setup

1. **Clone the repository:**
2. **Install dependencies:**
3. **Create a `.env` file in the `backend` folder** and add your MongoDB connection string:
*(Replace with your actual MongoDB URI if using Atlas or a different setup.)*

4. **Start the backend server:**
The backend will run on `http://localhost:5000` by default.

---

### Frontend Setup

1. **Navigate to the frontend directory:**

2. **Install dependencies:**

3. **Start the frontend development server:**
The frontend will run on `http://localhost:3000` by default.

---

## Project Structure

RoadTrip/
├── backend/
│ ├── models/ # Mongoose models
│ ├── routes/ # Express route handlers
│ ├── middleware/ # Custom middleware
│ ├── .env # Environment variables
│ ├── .gitignore
│ ├── server.js # Main server file
│ └── README.md
└── frontend/
└── my-app/ # React app
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ ├── index.js
│ └── ...
├── package.json
├── tailwind.config.js
└── ...


---

## API Endpoints (Backend)

| Endpoint                   | Method | Description                        |
|----------------------------|--------|------------------------------------|
| `/api/users`               | POST   | Create a new user                  |
| `/api/users`               | GET    | Get all users                      |
| `/api/roadtrips`           | POST   | Create a new road trip             |
| `/api/roadtrips`           | GET    | Get all road trips                 |
| `/api/roadtrips/my`        | GET    | Get trips created by current user  |
| `/api/roadtrips/:id`       | GET    | Get a single road trip by ID       |
| `/api/roadtrips/:id`       | PUT    | Update a road trip by ID           |
| `/api/roadtrips/:id`       | DELETE | Delete a road trip by ID           |
| `/api/locations`           | POST   | Add a location                     |
| `/api/locations`           | GET    | Get all locations                  |
| `/api/reviews`             | POST   | Add a review                       |
| `/api/reviews`             | GET    | Get all reviews                    |

---

## Frontend Features

- **User authentication (login/register)**
- **Browse and filter road trips**
- **Create, update, and delete trips**
- **Add and view reviews**
- **User profile management**
- **Responsive design for all devices**

---

## Environment Variables

- **`MONGO_URI`** (backend) – Your MongoDB connection string

---

## Deployment

To deploy, follow the standard procedures for Node.js/Express backend and React frontend.  
You can use platforms like Heroku, Vercel, or Netlify for frontend, and Heroku or Railway for backend.

---

## Troubleshooting

- **Backend not starting?** Check your MongoDB connection and `.env` file.
- **Frontend not connecting to backend?** Ensure the backend is running and update the API base URL in your frontend code if needed.

---

## Future Improvements

- **Add photo uploads for trips**
- **Implement real-time chat for trip participants**
- **Add maps integration for trip locations**

---

## Credits

This project was developed as part of an internship with aimerz and CARS24.

---

