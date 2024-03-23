import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SALT } from "../../consts.js";

import User from "../../models/User.js";

/**
 * ------------------------------
 *         GET USER TOKEN
 * ------------------------------
*/
export const getUserToken = async (req, res, next) => {

    // check errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "Bad Request": errors.array() });
    }

    // check if user exists
    const user = await User.query().findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ errors: [{ msg: "Gebruiker bestaat niet" }] });
    }

    // check password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ errors: [{ msg: "Wachtwoord is onjuist" }] });
    }

    // create token
    const token = jwt.sign({ id: user.id }, TOKEN_SALT, { expiresIn: "1h" });

    return res.status(200).json({ token });
}


/**
 * ------------------------------
 *       CHECK USER TOKEN
 * ------------------------------
*/
export const checkUserToken = async (req, res, next) => {

    // check if token is present
    if (!req.headers.authorization) {
        return res.status(401).json({ errors: [{ msg: "Geen token aanwezig" }] });
    }

    // check if token is valid
    const token = req.headers.authorization.split(" ")[1];
    try {
        const user = jwt.verify(token, TOKEN_SALT);
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ errors: [{ msg: "Token is ongeldig" }] });
    }

}