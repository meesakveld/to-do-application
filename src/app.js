import express from "express";
import { create } from "express-handlebars";
import { todos, categorizedTodos } from "./controllers/PageController.js"
import path from "path";
import handlebarsHelpers from "./lib/handlebarsHelpers.js";
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "./controllers/api/TodoController.js";
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from "./controllers/api/CategoryController.js";
import { handleTodo } from "./controllers/TodoController.js";

import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";

const app = express()

// Handlebars setup
const hbs = create({
	extname: '.hbs',
	helpers: handlebarsHelpers
})
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set("views", path.join(path.resolve("src"), "views"))

// Static files 
app.use(express.static('public'))

// View the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App Routes
app.get('/', todos)
app.get('/:category', categorizedTodos)

// - Todos Routing
app.post('/todo', handleTodo)


// API Todos routes
app.get('/api/todo', getTodos)
app.get('/api/todo/:id', getTodo)
app.post('/api/todo', createTodo)
app.patch('/api/todo/:id', updateTodo)
app.delete('/api/todo/:id', deleteTodo)

// API Categories routes
app.get('/api/category', getCategories)
app.get('/api/category/:id', getCategory)
app.post('/api/category', createCategory)
app.patch('/api/category/:id', updateCategory)
app.delete('/api/category/:id', deleteCategory)

// Start server -> npm run start:dev
app.listen(process.env.PORT, () => {
	console.log(`Todo app listening on http://localhost:${process.env.PORT}`)
})
