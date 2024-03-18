/**
 * A constants file
*/

import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_TYPE = process.env.DATABASE_TYPE || "sqlite";
export const DATABASE_NAME = process.env.DATABASE_NAME || "just-do-it.sqlite3";
export const NODE_ENV = process.env.NODE_ENV || "development";