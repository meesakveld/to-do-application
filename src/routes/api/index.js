/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import todoRoutes from "./todoRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

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

router.use('/todo', todoRoutes)
router.use('/category', categoryRoutes)

export default router;