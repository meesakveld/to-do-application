import { body } from "express-validator";

export default [
    body("email")
        .notEmpty()
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Email is not valid.")
        .bail(),
]