/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../../controllers/api/TodoController.js";

// Middleware
import validateTodo from "../../middleware/validation/TodoValidation.js";

/**
 * ------------------------------
 *        CONFIGURATION
 * ------------------------------
*/

const router = Express.Router();


/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
*/

// API Todos routes
router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', validateTodo, createTodo)
router.patch('/:id', validateTodo, updateTodo)
router.delete('/:id', deleteTodo)

export default router;