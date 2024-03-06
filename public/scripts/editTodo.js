function updateTodoToEditView() {
    const $todoItems = document.querySelectorAll('.todo-item');
    $todoItems.forEach(todoItem => {
        const $editButton = todoItem.querySelector('.edit button');
        if (!$editButton) return;
        $editButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            todoItem.querySelector('.todo').classList.toggle('editing');
        });
    });
}

function init() {
    updateTodoToEditView()
}

init()