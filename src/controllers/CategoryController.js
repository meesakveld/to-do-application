import { validationResult } from "express-validator";
import MailTransporter from "../lib/MailTransporter.js";

import Category from "../models/Category.js";
import Todo from "../models/Todo.js";

export const createCategory = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.categoryFormError = "";
        req.categoryFormError = errors.array()[0].msg;
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
        req.categoryFormError = "Category deletion failed! Category not found.";
        return next()
    }
    
    // Delete todos of this category
    await Todo.query().where("category_id", "=", category.id).delete();

    // Delete category
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