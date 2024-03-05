import { handleCategories } from '../helpers/index.js';
import Todo from '../models/Todo.js';
import Category from '../models/Category.js';

export const todos = async (req, res) => {
    const todos = await Todo.query().withGraphFetched('category');
    const categoriesData = await Category.query();
    const data = {
        todos: todos,
        categories: handleCategories(categoriesData),
        activeCategory: "All"
    }
    
    res.render("home", data)
}

export const categorizedTodos = async (req, res) => {
    const categoryParam = req.params.category;
    const category = await Category.query().whereRaw('LOWER(name) = ?', [categoryParam.toLowerCase()]).first();
    
    const todos = await Todo.query().withGraphFetched('category');
    const categoriesData = await Category.query();
    const data = {
        todos: !category ? todos : todos.filter(todo => todo.category_id === category.id),
        categories: handleCategories(categoriesData),
        activeCategory: !category ? "All" : category.name
    }

    res.render("home", data)

}