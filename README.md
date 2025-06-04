# RoadTrip Backend

This is the backend API for the RoadTrip web application. It allows users to browse, create, and manage road trips around the world.

## Features

- User registration and management
- Road trip creation, browsing, and management
- Location and review management
- Middleware for logging, authentication, and error  handling
- MongoDB database integration with Mongoose
- RESTful API endpoints

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Middleware (custom logging, authentication, error handling)
- Postman (for API testing and documentation)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or a MongoDB Atlas account

### Installation

1. Clone the repository:
git clone https://github.com/yourusername/RoadTrip.git
cd RoadTrip/backend
2. Install dependencies:
npm install
3. Create a `.env` file in the `backend` folder and add your MongoDB connection string:
4. Start the server:
npm start
The backend will run on `http://localhost:5000` by default.

## API Endpoints

The main endpoints are:

- `POST /api/users` – Create a new user
- `GET /api/users` – Get all users
- `POST /api/roadtrips` – Create a new road trip
- `GET /api/roadtrips` – Get all road trips
- `POST /api/locations` – Add a location
- `GET /api/locations` – Get all locations
- `POST /api/reviews` – Add a review
- `GET /api/reviews` – Get all reviews

For full documentation and request/response examples, see the [Postman collection](#) or import the provided JSON file into Postman.

## Project Structure

backend/
models/
routes/
middleware/
.env
.gitignore
server.js
README.md

## Environment Variables

- `MONGO_URI` – Your MongoDB connection string


**Developed as part of an internship project.**
