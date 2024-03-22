import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SALT } from "../consts.js";

import User from "../models/User.js";


/**
 * ------------------------------
 *            LOGIN
 * ------------------------------
*/
export const login = async (req, res, next) => {
    // get form inputs
    const inputs = [
        {
            name: "email",
            label: "Email",
            type: "email",
            value: req.body.email,
            err: req.formErrorFields?.email ? req.formErrorFields.email : "",
        },
        {
            name: "password",
            label: "Wachtwoord",
            type: "password",
            err: req.formErrorFields?.password ? req.formErrorFields.password : "",
        },
    ];


    // get flash messages
    const flash = req.flash || null;

    res.render("login", { "layout": "authentication", inputs, flash });
}

export const postLogin = async (req, res, next) => {

    // check errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
            req.formErrorFields[error.path] = error.msg;
        });

        // set flash message
        req.flash = "Er zijn fouten gevonden in het formulier";

        // redirect to the login page
        return next();
    }

    // check if user exists
    const user = await User.query().findOne({ email: req.body.email });
    if (!user) {
        req.flash = "Gebruiker bestaat niet";
        return next();
    }

    // check password
    const match = bcrypt.compareSync(req.body.password, user.password);

    if (!match) {
        req.flash = "Wachtwoord is fout";
        return next();
    }

    // token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        TOKEN_SALT,
        {
            expiresIn: "1h",
        }
    );

    // set cookie, this is very unsafe, but for now it's okay
    res.cookie("user", token, { httpOnly: true });

    // redirect to the home page
    res.redirect("/");

}



/**
 * ------------------------------
 *           REGISTER
 * ------------------------------
*/
export const register = async (req, res, next) => {
    // get form inputs
    const inputs = [
        {
            name: "firstname",
            label: "Voornaam",
            type: "text",
            value: req.body.firstname,
            err: req.formErrorFields?.firstname ? req.formErrorFields.firstname : "",
        },
        {
            name: "lastname",
            label: "Achternaam",
            type: "text",
            value: req.body.lastname,
            err: req.formErrorFields?.lastname ? req.formErrorFields.lastname : "",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            value: req.body.email,
            err: req.formErrorFields?.email ? req.formErrorFields.email : "",
        },
        {
            name: "password",
            label: "Wachtwoord",
            type: "password",
            err: req.formErrorFields?.password ? req.formErrorFields.password : "",
        },
    ];

    // get flash messages
    const flash = req.flash || null;

    res.render("register", { "layout": "authentication", inputs, flash });
}

export const postRegister = async (req, res, next) => {
    // check errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
            req.formErrorFields[error.path] = error.msg;
        });

        // set flash message
        req.flash = "Er zijn fouten gevonden in het formulier";

        // redirect to the login page
        return next();
    }

    // check if user exists
    const userExists = await User.query().findOne({ email: req.body.email });
    if (userExists) {
        req.flash = "Gebruiker bestaat al";
        return next();
    }

    // hash password
    const pass = bcrypt.hashSync(req.body.password, 10);

    const user = await User.query().insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: pass,
    });

    // redirect to the login page
    res.redirect("/login");

}



/**
 * ------------------------------
 *            LOGOUT
 * ------------------------------
*/
export const logout = async (req, res) => { 
    res.clearCookie("user");
    res.redirect("/");
}