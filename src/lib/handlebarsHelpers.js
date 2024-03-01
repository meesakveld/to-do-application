
export default {
    filterTodosByStatus: (todos, param) => {
        if(param.hash.isChecked) {
            return todos.filter(todo => todo.is_completed);
        } else {
            return todos.filter(todo => !todo.is_completed);
        }
    },
    ifEquals: (arg1, arg2, options) => {
        return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    },
    toLowerCase: (str) => {
        return str.toLowerCase();
    }
}