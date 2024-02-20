
export default {
    filterUncheckedTodos: (todos) => {
        return todos.filter(todo => !todo.isCompleted);
    },
    filterCheckedTodos: (todos) => {
        return todos.filter(todo => todo.isCompleted);
    },
    filterUniqueCategories: (todos) => {
        const categories = todos.map(todo => todo.category);
        const uniqueCategories = [...new Set(categories)];
        uniqueCategories.sort();
        uniqueCategories.splice(uniqueCategories.indexOf('General'), 1);
        uniqueCategories.unshift('General');
        return uniqueCategories;
    }
}