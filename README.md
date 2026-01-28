
## Project Description

This project is a complete polling system that supports two roles:

  ## Admin
    Login as admin
    Create new polls with multiple options

  ## User
   Login as user
   View active polls
   Vote only once per poll
   View poll results after voting

The application uses JSON Server as a mock database and follows a proper backend API structure using Express.

## Tech Stack Used
  ## Frontend

     React.js

    Material UI (MUI)

    React Router

    Axios

  ## Backend

   Node.js

   Express.js

   JSON Server 

## Database Structure
{
  "polls": [
    {
      "id": 1,
      "question": "Which car do you like most?",
      "options": [
        { "id": "1", "text": "BMW", "votes": 1 },
        { "id": "2", "text": "Mercedes", "votes": 0 }
      ]
    }
  ]
}


## Run Backend
npm install
node server.js (Backend will run on:http://localhost:5000)

## Run Frontend
npm install
npm start (Frontend will run on:http://localhost:3000)

##  run JSON Server
npx json-server --watch db.json --port 3001 

## API Endpoints

 Polls
  GET /polls – List all polls
  GET /polls/:id – Get poll details
  POST /polls – Create a new poll (Admin)
 Voting
  POST /polls/:id/vote – Vote on a poll
 Results
  GET /polls/:id/results – View poll results

## Assumptions Made

No real authentication (demo login only)
Admin/User role handled on frontend
Vote restriction handled using localStorage
JSON Server used instead of real database
Single-user environment (no concurrent users)
