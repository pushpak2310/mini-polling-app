
## Project Description

The Mini Polling Application allows users to:
Create new polls with multiple options (Admin)
View a list of active polls
Vote on a poll (only once per user)
View poll results after voting

The backend is powered by Express.js and JSON Server, while the frontend is built with React and Material UI for a clean and responsive UI.

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

A user can vote only once per poll (handled using localStorage)
No authentication system is implemented
JSON Server is used as a mock database
Admin access is assumed for poll creation
Poll results are visible only after voting
