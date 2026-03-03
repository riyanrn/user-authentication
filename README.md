# user-authentication
A full-stack User Authentication application built with Angular (frontend) and Node.js (Express) (backend).
It provides a simple login flow with user email and password
Frontend: 

A login component which loads with /login route for authenticating the user with email and password stored in backend.

Added validation for email format and minium 8 characters length for password.

When the user submits the form it call the backend API to validate the user if the user credentials are present in system it will allow the user to login or else send error message with 401 status code.

Created a service to integrae backend API.

Backend: 

Created a controller, router for the login API 

Added a config for user credentials and comparing the request payload data with config credentials ( hard coded value ) 

If matches sending the response 200 with user name or else sending 401 with "Invalid credentials" message.

Dummy user config: 

USER_CREDENTIALS = [
    {
        email: 'riyan.m@gmail.com',
        password: 'riyan12345',
        full_name: 'Riyan M'
    },
    {
        email: 'test@gmail.com',
        password: 'test1234',
        full_name: 'test user'
    },
]

Project structure:

user-authentication/
│
├── frontend/ (Angular)
│   ├── login/
│   ├── services/
│   └── app-routing.module.ts
│
├── backend/ (Node.js + Express)
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── index.js
│
└── README.md