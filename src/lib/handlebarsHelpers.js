
export default {
    filterTodosByStatus: (todos, param) => {
        if(param.hash.isChecked) {
            return todos.filter(todo => todo.isCompleted);
        } else {
            return todos.filter(todo => !todo.isCompleted);
        }
    },
}