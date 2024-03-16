import { validationResult } from "express-validator";
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
    
    await Category.query().insert({
        name: req.body.name,
    });
    req.body = {}

    return next()
}

export const deleteCategory = async (req, res, next) => {
    const category = await Category.query().findById(req.body.id)
    if (!category) {
        return res.status(404).json({ message: `Todo with id: ${req.body.id} not found` })
    }
    
    await Category.query().deleteById(req.body.id);
    req.body = {}
    
    return next()
}

export const handleCategory = async (req, res, next) => {

    if (req.body.method === "POST") {
        createCategory(req, res, next);
    }
    if (req.body.method === "DELETE") {
        deleteCategory(req, res, next);
    }

}