# TODO App

## Introduction
This is a TODO application that allows users to manage their tasks and categories. Users are required to log in to access their personalized todos and categories. The application also provides features to generate QR codes for sharing todos based on categories or all todos. Additionally, users can send all their todos via email. Users will receive email notifications when they add a new todo or category to their account.

This application is built using Node.js, Express, and SQLite3. The application is structured using the MVC pattern, and the database is managed using Knex.js. The application also uses the nodemailer package to send emails to users.

The application also provides an API for users to manage their todos and categories. Users can perform CRUD operations on todos and categories by sending requests to the appropriate endpoints.

<br>

## Installation
1. Clone the repository: `git clone https://github.com/meesakveld/to-do-application.git`
2. Install the dependencies: `npm install`
3. Configure the database via the command `npx knex migrate:latest`
4. Add the seed data to the database via the command `npx knex seed:run`
5. Add the .env file to the root of the project with the following content:
    ```
    PORT=3000
    DATBASE_TYPE=sqlite
    DATABASE_NAME=your-database-name.sqlite3 #Replace with the name of your database
    NODE_ENV=development

    TOKEN_SALT=your-token-salt #Replace with your token salt

    MAIL_USER=your-email #Replace with your email
    MAIL_PASS=your-email-password #Replace with your email password
    ```
6. Start the application: `npm run start:dev`

## Feature Overview

### Application
- **User authentication**: Users must log in to access their todos and categories.
- **Personalized todos and categories**: Each user has their own set of todos and categories.
- **QR code generation**: Users can generate QR codes for sharing todos based on categories or all todos.
- **Email functionality**: Users can send all their todos via email.
- **Email notifications**: Users receive email notifications when they add a new todo or category.

<br>

### API
- **User authentication**: Users must log in to their account by sending a POST request to `http://localhost:3000/api/auth/login` with their credentials. They will receive a bearer token in the response, which they should include in the headers of subsequent requests.
- **Todo management**: Users can perform CRUD operations on todos by sending requests to `http://localhost:3000/api/todo`. They can use GET to retrieve all todos, POST to create a new todo, PATCH to update an existing todo, and DELETE to delete a todo.
- **Category management**: Users can perform CRUD operations on categories by sending requests to `http://localhost:3000/api/category`. They can use GET to retrieve all categories, POST to create a new category, PATCH to update an existing category, and DELETE to delete a category.

To access the todo and category endpoints, users need to include the bearer token in the headers of their requests that they got from the login endpoint.

<br>

## Author
This project was created by [Mees Akveld](https://www.github.com/meesakveld) for the Programming 3 course at Artevelde University of Applied Sciences.