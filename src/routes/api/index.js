/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import todoRoutes from "./todoRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import authRoutes from "./authRoutes.js";

// Middleware
import { checkUserToken } from "../../controllers/api/AuthController.js";

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

router.use('/todo', checkUserToken, todoRoutes)
router.use('/category', checkUserToken, categoryRoutes)
router.use('/auth', authRoutes)

export default router;