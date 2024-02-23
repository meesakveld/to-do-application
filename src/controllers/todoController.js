import todosData from '../data/todos.js';
import { filterUniqueCategoriesFromTodos } from '../helpers/index.js';

export const todos = (req, res) => {
    
    const data = {
        todos: todosData,
        categories: filterUniqueCategoriesFromTodos(todosData),
        activeCategory: "All"
    }
    
    res.render("home", data)
}

export const categorizedTodos = (req, res) => {
    
    const category = req.params.category;
    const data = {
        todos: category === "All" ? todosData : todosData.filter(todo => todo.category.toLowerCase() === category.toLowerCase()),
        categories: filterUniqueCategoriesFromTodos(todosData),
        activeCategory: category
    }
    res.render("home", data)

}