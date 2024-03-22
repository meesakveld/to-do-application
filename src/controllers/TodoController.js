import { validationResult } from "express-validator";
import MailTransporter from "../lib/MailTransporter.js";
import Todo from "../models/Todo.js";
import Category from "../models/Category.js";

export const createTodo = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach(error => {
            req.formErrorFields[error.path] = error.msg;
        });
        return next()
    }

    const user = req.user;

    await Todo.query().insert({
        title: req.body.title,
        category_id: parseInt(req.body.category_id) || null,
        is_completed: false,
        user_id: user.id
    });

    try {
        const category = await Category.query().where('id', '=', parseInt(req.body.category_id)).first();
        const categoryName = category ? category.name : null;
        await MailTransporter.sendMail({
            from: "noreply@just-do-it.com",
            to: user.email,
            subject: "Todo succesfully added!",
            template: "succesfullyAdded",
            context: {
                item: "Todo",
                value: `${req.body.title}${categoryName ? ` | ${categoryName}` : ""}`
            },
        });
    } catch (error) {
        console.error(error);
    }

    req.body = {}

    return res.redirect(req.headers.referer)
}


export const updateTodo = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.todoError = {};
        req.todoError.message = errors.errors[0].msg
        req.todoError.todoId = req.body.id
        req.todoError.value = req.body.title

        const activeCategory = req.body.activeCategory
        req.body = {}
        req.body.activeCategory = activeCategory

        return next()
    }

    const user = req.user;

    const todo = {
        title: req.body.title,
        category_id: req.body.category_id ? parseInt(req.body.category_id) : null,
        is_completed: req.body.is_completed === "true" ? true : false,
        user_id: user.id
    }
    await Todo.query().where('user_id', "=", user.id).patchAndFetchById(req.body.id, todo);

    req.body = {}

    return res.redirect(req.headers.referer)
}


export const deleteTodo = async (req, res, next) => {
    const todo = await Todo.query().findById(req.body.id)
    if (!todo) {
        return res.status(404).json({ message: `Todo with id: ${req.body.id} not found` })
    }

    const user = req.user;
    await Todo.query().where('user_id', "=", user.id).deleteById(req.body.id);

    return res.redirect(req.headers.referer)
}


export const mailAllTodos = async (req, res, next) => {
    const todos = await Todo.query().withGraphFetched('category');
    const mail = req.body.email;

    try {
        await MailTransporter.sendMail({
            from: "noreply@just-do-it.com",
            to: mail,
            subject: "List of all todos!",
            template: "allTodos",
            context: {
                todos: todos
            },
        });
    } catch (error) {
        console.error(error);
    }

    return res.redirect(req.headers.referer)
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

    if (method === "MAIL") {
        mailAllTodos(req, res, next);
    }

}