/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import { getUserToken } from "../../controllers/api/AuthController.js";

// Middleware
import AuthLoginValidation from "../../middleware/validation/AuthLoginValidation.js";

/**
 * ------------------------------
 *        CONFIGURATION
 * ------------------------------
*/

const router = Express.Router();


/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
*/

router.get('/login', AuthLoginValidation, getUserToken)


export default router;