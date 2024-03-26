function addEditingToClasslist(item, clickedClassname) {
    const $pressedItems = document.querySelectorAll(item);
    $pressedItems.forEach($pressedItem => {
        const $editBtn = $pressedItem.querySelector(clickedClassname)
        console.log($pressedItem)
        console.log($editBtn)
        if (!$editBtn) return;
        $editBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            console.log($pressedItem)
            $pressedItem.classList.toggle('editing');
        });
    });
    
}

function init() {
    addEditingToClasslist('.todo-item', '.edit');
    addEditingToClasslist('.category_item', '.edit_btn')
}

init()