import { body } from "express-validator";

export default [
    body("name")
        .notEmpty()
        .withMessage("Category name is required.")
        .bail(),
    
    body("user_id")
        .notEmpty()
        .withMessage("User id is required.")
        .bail()
        .isInt()
        .withMessage("User id must be an integer."),
]