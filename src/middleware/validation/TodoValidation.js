import { body } from "express-validator";

export default [
    body("title")
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters long.")
        .bail(),
    body("category_id")
        .optional()
        .isInt()
        .withMessage("Category id must be an integer.")
        .bail(),
]