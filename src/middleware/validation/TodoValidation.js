import { body } from "express-validator";

export default [
    body("title")
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters long.")
        .bail(),

    body("category_id")
        .optional()
        .custom((value) => {
            if (value === "" || Number.isInteger(Number(value))) {
                return true;
            }
            throw new Error("Category id must be an integer.");
        })
        .bail(),

    body("user_id")
        .notEmpty()
        .withMessage("User id is required.")
        .bail()
        .isInt()
        .withMessage("User id must be an integer."),
]