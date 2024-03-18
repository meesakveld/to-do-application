import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { VIEWS_PATH } from "../consts.js";

import hbs from "nodemailer-express-handlebars";

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    auth: {
        user: 'project.2',
        pass: 'secret.2'
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