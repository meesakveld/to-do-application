import { body } from "express-validator";

export default [
    body("title")
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters long.")
        .bail(),
]