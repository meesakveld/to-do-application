
export default {
    filterTodosByStatus: (todos, param) => {
        if(param.hash.isChecked) {
            return todos.filter(todo => todo.isCompleted);
        } else {
            return todos.filter(todo => !todo.isCompleted);
        }
    },
    ifEquals: (arg1, arg2, options) => {
        return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    },
    toLowerCase: (str) => {
        return str.toLowerCase();
    }
}