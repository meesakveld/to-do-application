import { validationResult } from "express-validator";
import MailTransporter from "../lib/MailTransporter.js";
import Category from "../models/Category.js";

export const createCategory = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach(error => {
            req.formErrorFields[error.path] = error.msg;
        });
        return next()
    }
    
    const user = req.user;

    await Category.query().insert({
        name: req.body.name,
        user_id: user.id
    });

    try {
        await MailTransporter.sendMail({
            from: "noreply@just-do-it.com",
            to: user.email,
            subject: "Category succesfully added!",
            template: "succesfullyAdded",
            context: {
                item: "Category",
                value: req.body.name
            },
        });
    } catch (error) {
        console.error(error);
    }

    req.body = {}

    return res.redirect(req.headers.referer);
}

export const deleteCategory = async (req, res, next) => {
    const user = req.user;

    const category = await Category.query().where("user_id", "=", user.id).findById(req.body.id)
    if (!category) {
        return res.status(404).json({ message: `Category with id: ${req.body.id} not found` })
    }
    
    await Category.query().where("user_id", "=", user.id).deleteById(req.body.id);
    req.body = {}
    
    return res.redirect(req.headers.referer);
}

export const handleCategory = async (req, res, next) => {

    if (req.body.method === "POST") {
        createCategory(req, res, next);
    }
    if (req.body.method === "DELETE") {
        deleteCategory(req, res, next);
    }

}