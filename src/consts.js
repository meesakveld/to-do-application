/**
 * A constants file
*/

import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

export const SOURCE_PATH = path.resolve("src");
export const VIEWS_PATH = path.resolve(SOURCE_PATH, "views");

export const PORT = process.env.PORT || 3000;
export const DATABASE_TYPE = process.env.DATABASE_TYPE;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const NODE_ENV = process.env.NODE_ENV;

export const TOKEN_SALT = process.env.TOKEN_SALT;

export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;