# TODO App

## Introduction
This is a TODO application that allows users to manage their tasks and categories. Users are required to log in to access their personalized todos and categories. The application also provides features to generate QR codes for sharing todos based on categories or all todos. Additionally, users can send all their todos via email. Users will receive email notifications when they add a new todo or category to their account.

<br>

## Installation
1. Clone the repository: `git clone https://github.com/pgmgent-pgm-3/opdracht-1-to-do-application-pgm-meesakveld.git`
2. Install the dependencies: `npm install`
3. Configure the database via the command `npx knex migrate:latest`
4. Start the application: `npm run start:dev`

<br>

## Feature Overview

### Application
- **User authentication**: Users must log in to access their todos and categories.
- **Personalized todos and categories**: Each user has their own set of todos and categories.
- **QR code generation**: Users can generate QR codes for sharing todos based on categories or all todos.
- **Email functionality**: Users can send all their todos via email.
- **Email notifications**: Users receive email notifications when they add a new todo or category.

### API
- **User authentication**: Users must log in to their account by sending a POST request to `http://localhost:3000/api/auth/login` with their credentials. They will receive a bearer token in the response, which they should include in the headers of subsequent requests.
- **Todo management**: Users can perform CRUD operations on todos by sending requests to `http://localhost:3000/api/todo`. They can use GET to retrieve all todos, POST to create a new todo, PATCH to update an existing todo, and DELETE to delete a todo.
- **Category management**: Users can perform CRUD operations on categories by sending requests to `http://localhost:3000/api/category`. They can use GET to retrieve all categories, POST to create a new category, PATCH to update an existing category, and DELETE to delete a category.

To access the todo and category endpoints, users need to include the bearer token in the headers of their requests that they got from the login endpoint.

<br>

## Author
Mees Akveld