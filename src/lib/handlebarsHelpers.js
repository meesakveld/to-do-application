import handlebarsHelpers from "handlebars-helpers";
const handyHelpers = handlebarsHelpers();

const myHelpers = {
    filterTodosByStatus: (todos, param) => {
        if (param.hash.isChecked) {
            return todos.filter(todo => todo.is_completed);
        } else {
            return todos.filter(todo => !todo.is_completed);
        }
    },
    ifEquals: (arg1, arg2, options) => {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    toLowerCase: (str) => {
        return str.toLowerCase();
    },
    checkForActiveCategories: (categories) => {
        if (categories.find(category => category.isActive)) { return true }
        return false;
    },
    findActiveCategory: (categories) => {
        const activeCategory = categories.find(category => category.isActive)?.name.toLowerCase();
        if (activeCategory) { return activeCategory }
        return "";
    },
    findActiveCategoryId: (categories) => {
        const activeCategory = categories.find(category => category.isActive)?.id;
        if (activeCategory) { return activeCategory }
        return "";
    },
    setVariable(varName, varValue, options){
        options.data.root[varName] = varValue;
    }
}

export default { ...handyHelpers, ...myHelpers };