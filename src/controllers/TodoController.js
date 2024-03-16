import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";

export const createTodo = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach(error => {
            req.formErrorFields[error.path] = error.msg;
        });
        return next()
    }
    
    await Todo.query().insert({
        title: req.body.title,
        category_id: parseInt(req.body.category_id) || null,
        is_completed: false
    });
    req.body = {}

    return next()
}


export const updateTodo = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.todoError = {};
        req.todoError.message = errors.errors[0].msg
        req.todoError.todoId = req.body.id
        req.todoError.value = req.body.title

        req.body = {}

        return next()
    }

    const todo = {
        title: req.body.title,
        category_id: req.body.category_id ? parseInt(req.body.category_id) : null,
        is_completed: req.body.is_completed === "true" ? true : false
    }
    await Todo.query().patchAndFetchById(req.body.id, todo);
    
    req.body = {}
    
    return next()
}


export const deleteTodo = async (req, res, next) => {
    const todo = await Todo.query().findById(req.body.id)
    if (!todo) {
        return res.status(404).json({ message: `Todo with id: ${req.body.id} not found` })
    }
    await Todo.query().deleteById(req.body.id);
    
    return next()
}


export const handleTodo = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST") {
        createTodo(req, res, next);
    }
    if (method === "PATCH") {
        updateTodo(req, res, next);
    }
    if (method === "DELETE") {
        deleteTodo(req, res, next);
    }

}