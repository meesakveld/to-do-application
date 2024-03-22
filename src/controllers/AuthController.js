import { validationResult } from "express-validator";
import bcript from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SALT } from "../consts";

import User from "../models/User";


/**
 * ------------------------------
 *            LOGIN
 * ------------------------------
*/
export const login = async (req, res) => {}

export const postLogin = async (req, res) => {}



/**
 * ------------------------------
 *           REGISTER
 * ------------------------------
*/
export const register = async (req, res) => {}

export const postRegister = async (req, res) => {}



/**
 * ------------------------------
 *            LOGOUT
 * ------------------------------
*/
export const logout = async (req, res) => {}