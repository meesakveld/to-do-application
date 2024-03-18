/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
 */

import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import handlebarsHelpers from "./lib/handlebarsHelpers.js";
import dotenv from "dotenv";

// Midleware
import TodoValidation from "./middleware/validation/TodoValidation.js";
import CategoryValidation from "./middleware/validation/CategoryValidation.js";

// Controllers
import { getTodos } from "./controllers/PageController.js"
import { handleTodo } from "./controllers/TodoController.js";
import { handleCategory } from "./controllers/CategoryController.js";

// Helpers
import path from "path";

// Routes
import apiRoutes from "./routes/api/index.js";

/**
 * ------------------------------
 *        CONFIGURATION
 * ------------------------------
*/

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

// Load environment variables
dotenv.config();

// View the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
*/

// Page Routes
app.get('/', getTodos)
app.get('/category/:slug', getTodos)

// Handle form data
app.post('/todo', TodoValidation, handleTodo, getTodos)
app.post('/category', CategoryValidation, handleCategory, getTodos)

// API Routes
app.use('/api', apiRoutes)


/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
 */

// Start server -> npm run start:dev
app.listen(process.env.PORT, () => {
	console.log(`Todo app listening on http://localhost:${process.env.PORT}`)
})
