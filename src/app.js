import express from "express";
import { create } from "express-handlebars";
import { todos, categorizedTodos } from "./controllers/todoController.js"
import path from "path";
import handlebarsHelpers from "./lib/handlebarsHelpers.js";

import dotenv from "dotenv";
dotenv.config();


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

// Routes
app.get('/', todos)
app.get('/:category', categorizedTodos)

// Start server -> npm run start:dev
app.listen(process.env.PORT, () => {
	console.log(`Todo app listening on port ${process.env.PORT}`)
})
