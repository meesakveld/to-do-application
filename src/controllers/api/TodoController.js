import { validationResult } from "express-validator";
import Todo from '../../models/Todo.js'

/**
 * @api {get} /api/todos Get all todos
 */
export const getTodos = async (req, res, next) => {
    const todos = await Todo.query().where('user_id', "=", req.user.id)
    if (!todos) {
        return res.status(404).json({ message: `No todos found` })
    }
    res.json(todos)
}


/**
 * @api {get} /api/todos Get all todos with pagination
*/


/**
 * @api {get} /api/todos/:id Get a single todo
 */
export const getTodo = async (req, res, next) => {
    const todo = await Todo.query().where('user_id', "=", req.user.id).findById(req.params.id)
    if (!todo) {
        return res.status(404).json({ message: `Todo with id: ${req.params.id} not found` })
    }
    res.json(todo)
}


/**
 * @api {post} /api/todos Create a new todo
 */
export const createTodo = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const title = req.body.title;
    const category_id = req.body.category_id || null;
    const is_completed = req.body.is_completed || false;

    const user = await Todo.query().insert({
        title,
        category_id,
        is_completed,
        user_id: req.user.id
    });

    res.status(201).json(user);
}


/**
 * @api {patch} /api/todos/:id Update a todo
 */
export const updateTodo = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const todo = await Todo.query().where('user_id', "=", req.user.id).findById(req.params.id)
    if (!todo) {
        return res.status(404).json({ message: `Todo with id: ${req.params.id} not found` })
    }

    const body = req.body;
    const updatedTodo = await Todo.query().where('user_id', "=", req.user.id).patchAndFetchById(req.params.id, body);
    res.json(updatedTodo);
}


/**
 * @api {delete} /api/todos/:id Delete a todo
 */
export const deleteTodo = async (req, res, next) => {
    const todo = await Todo.query().where('user_id', "=", req.user.id).findById(req.params.id)
    if (!todo) {
        return res.status(404).json({ message: `Todo with id: ${req.params.id} not found` })
    }
    await Todo.query().where('user_id', "=", req.user.id).deleteById(req.params.id);
    res.json({ message: `Todo with id: ${req.params.id} deleted` })
}
