/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from "../../controllers/api/CategoryController.js";

// Middleware
import CategoryValidation from "../../middleware/validation/CategoryValidation.js";

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

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/', CategoryValidation, createCategory)
router.patch('/:id', CategoryValidation, updateCategory)
router.delete('/:id', deleteCategory)


export default router;