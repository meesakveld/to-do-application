import Todo from '../models/Todo.js';
import Category from '../models/Category.js';


/**
 * Retrieves todos based on the specified category and renders the home view.
*/
export const getTodos = async (req, res) => {
    // Get all categories and set the active category
    const categories = await Category.query();
    if (req.query.category) {
        categories.forEach(category => category.name.toLowerCase() === req.query.category ? category.isActive = true : category.isActive = false);
    } else {
        categories.forEach(category => category.isActive = false);
    }

    // Get all todos
    const active_category_id = req.query.category ? categories.find(category => category.name.toLowerCase() === req.query.category)?.id : null;
    const todos = active_category_id ? await Todo.query().where('category_id', "=", active_category_id).withGraphFetched('category') : await Todo.query().withGraphFetched('category');
    todos.forEach(todo => todo.categories = categories);

    // Set the data object
    const data = {
        todos, 
        categories,
        input: {
            title: req.body?.title || "",
            category_id: req.body.category_id || "",
            err: req.formErrorFields?.title || ""
        },
    }

    // Render the home view
    return res.render("home", data);
}