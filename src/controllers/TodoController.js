import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";

export const createTodo = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach(error => {
            req.formErrorFields[error.path] = error.msg;
        });
        req.flash = {
            type: "danger",
            message: "There are errors in the form. Please fix them and try again."
        }

        return res.redirect(req.headers.referer);
    }
    
    await Todo.query().insert({
        title: req.body.title,
        category_id: parseInt(req.body.category_id) || null,
        is_completed: false
    });
    req.body = {}

    return res.redirect(req.headers.referer);
}


export const updateTodo = async (req, res) => {
    const todo = {
        title: req.body.title,
        category_id: req.body.category_id ? parseInt(req.body.category_id) : null,
        is_completed: req.body.is_completed === "true" ? true : false
    }
    await Todo.query().patchAndFetchById(req.body.id, todo);
    res.redirect(req.headers.referer);
}


export const deleteTodo = async (req, res) => {
    const todo = await Todo.query().findById(req.body.id)
    if (!todo) {
        return res.status(404).json({ message: `Todo with id: ${req.body.id} not found` })
    }
    await Todo.query().deleteById(req.body.id);
    res.redirect(req.headers.referer);
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