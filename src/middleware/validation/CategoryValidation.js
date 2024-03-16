import { body } from "express-validator";

export default [
    body("name")
        .notEmpty()
        .withMessage("Category name is required.")
        .bail(),
]