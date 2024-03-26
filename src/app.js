/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import handlebarsHelpers from "./lib/handlebarsHelpers.js";
import { PORT } from "./consts.js";
import cookieParser from "cookie-parser";

// Middleware
import TodoValidation from "./middleware/validation/TodoValidation.js";
import CategoryValidation from "./middleware/validation/CategoryValidation.js";
import AuthRegisterValidation from "./middleware/validation/AuthRegisterValidation.js";
import AuthLoginValidation from "./middleware/validation/AuthLoginValidation.js";
import ShareWithEmailValidation from "./middleware/validation/ShareWithEmailValidation.js";

import jwtAuth from "./middleware/jwtAuth.js";

// Controllers
import { getTodos } from "./controllers/PageController.js"
import { handleTodo, mailAllTodos } from "./controllers/TodoController.js";
import { handleCategory } from "./controllers/CategoryController.js";
import * as AuthController from "./controllers/AuthController.js";

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

// Make use of the cookie parser 🍪 middleware
app.use(cookieParser());

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

/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
*/

// Auth routes
app.get("/login", AuthController.login);
app.post("/login", AuthLoginValidation, AuthController.postLogin, AuthController.login);

app.get("/register", AuthController.register);
app.post("/register", AuthRegisterValidation, AuthController.postRegister, AuthController.register);	

app.get("/logout", AuthController.logout);

// Page Routes
app.get('/', jwtAuth, getTodos)
app.get('/category/:slug', jwtAuth, getTodos)

// Handle form data
app.post('/todo', jwtAuth, TodoValidation, handleTodo, getTodos)
app.post('/category', jwtAuth, CategoryValidation, handleCategory, getTodos)

// Send mail with all todos
app.post('/share', jwtAuth, ShareWithEmailValidation, mailAllTodos, getTodos)

// API Routes
app.use('/api', apiRoutes)

// 404 Page
app.use('*', jwtAuth, getTodos)


/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
 */

// Start server -> npm run start:dev
app.listen(PORT, () => {
	console.log(`Todo app listening on http://localhost:${PORT}`)
})
