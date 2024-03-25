import nodemailer from "nodemailer";

import path from "path";
import { VIEWS_PATH, MAIL_USER, MAIL_PASS } from "../consts.js";

import hbs from "nodemailer-express-handlebars";

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
});

transporter.use(
    "compile",
    hbs({
        viewEngine: {
            extName: ".hbs",
            partialsDir: path.join(VIEWS_PATH, "partials"),
            layoutsDir: path.join(VIEWS_PATH, "layouts"),
            defaultLayout: "mail.hbs",
        },
        viewPath: path.join(VIEWS_PATH, "emails"),
        extName: ".hbs",
    })
);

export default transporter;