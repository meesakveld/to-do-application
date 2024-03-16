import { handleCategories } from '../helpers/index.js';
import Todo from '../models/Todo.js';
import Category from '../models/Category.js';


/**
 * Retrieves todos based on the specified category and renders the home view.
*/
export const todos = async (req, res) => {
    const categoryParam = req.query.category || null;
    let category = null;
    if (categoryParam) {
        category = await Category.query().whereRaw('LOWER(name) = ?', [categoryParam.toLowerCase()]).first();
    }
    
    const todos = await Todo.query().withGraphFetched('category');
    const categoriesData = await Category.query()
    const todosData = !category ? todos : todos.filter(todo => todo.category_id === category.id);
    const data = {
        todos: todosData.map(todo => {
            return {
                ...todo,
                categories: categoriesData
            }
        }),
        categories: handleCategories(categoriesData),
        activeCategory: !category ? null : category.id,
        input: {
            title: req.body?.title || "",
            category_id: req.body.category_id || "",
            err: req.formErrorFields?.title || ""
        },
    }

    res.render("home", data)

}