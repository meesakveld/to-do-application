import { validationResult } from "express-validator";
import Category from '../../models/Category.js'

/**
 * @api {get} /api/categories Get all categories
 */
export const getCategories = async (req, res, next) => {
    const categories = await Category.query()
    if (!categories) {
        return res.status(404).json({ message: `No categories found` })
    }
    res.json(categories)
}


/**
 * @api {get} /api/categories/:id Get a single category
 */
export const getCategory = async (req, res, next) => {
    const category = await Category.query().findById(req.params.id)
    if (!category) {
        return res.status(404).json({ message: `Category with id: ${req.params.id} not found` })
    }
    res.json(category)
}


/**
 * @api {post} /api/categories Create a new category
 */
export const createCategory = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const category = await Category.query().insert({
        name
    });
    res.status(201).json(category);
}


/**
 * @api {patch} /api/categories/:id Update a category
 */
export const updateCategory = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const category = await Category.query().findById(req.params.id)
    if (!category) {
        return res.status(404).json({ message: `Category with id: ${req.params.id} not found` })
    }
    const body = req.body;
    const updatedCategory = await Category.query().patchAndFetchById(req.params.id, body);
    res.json(updatedCategory);
}


/**
 * @api {delete} /api/categories/:id Delete a category
 */
export const deleteCategory = async (req, res, next) => {
    const category = await Category.query().findById(req.params.id)
    if (!category) {
        return res.status(404).json({ message: `Category with id: ${req.params.id} not found` })
    }
    await Category.query().deleteById(req.params.id);
    res.send({ message: `Category with id: ${req.params.id} deleted`})
}
