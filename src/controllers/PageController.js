import Todo from '../models/Todo.js';
import Category from '../models/Category.js';


/**
 * Retrieves todos based on the specified category and renders the home view.
*/
export const getTodos = async (req, res) => {
    const userId = req.user.id;

    // Get all categories and set the active category
    const categories = await Category.query().where('user_id', "=", userId);

    let activeCategory;
    if(req.params.slug) {
        activeCategory = req.params.slug;
    } else if (req.body.activeCategory) {
        activeCategory = req.body.activeCategory;
    }
 
    if (activeCategory) {
        categories.forEach(category => category.name.toLowerCase() === activeCategory ? category.isActive = true : category.isActive = false);
    } else {
        categories.forEach(category => category.isActive = false);
    }

    // Get all todos
    const active_category_id = activeCategory ? categories.find(category => category.name.toLowerCase() === activeCategory)?.id : null;
    let todos = active_category_id ? await Todo.query().where('user_id', "=", userId).where('category_id', "=", active_category_id).withGraphFetched('category') : await Todo.query().where('user_id', "=", userId).withGraphFetched('category');
    todos.forEach(todo => todo.categories = categories);
    todos.forEach(todo => {
        if (todo.id === parseInt(req.todoError?.todoId)) {
            todo.error = {
                message: req.todoError?.message,
                value: req.todoError?.value
            }
        } else { todo.error = null }
    })

    // Set the data object
    const data = {
        todos, 
        activeCategory,
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