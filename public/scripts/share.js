function showShareView() {
    const $shareBtnElement = document.querySelector('.share_btn');
    $shareBtnElement.addEventListener('click', (ev) => {
        ev.preventDefault();
        const $shareElement = document.querySelector('.share');
        $shareElement.classList.toggle('hidden');
    })
}

function closeShareView() {
    const $shareCloseElement = document.querySelector('.share_close_area');
    $shareCloseElement.addEventListener('click', (ev) => {
        const $shareElement = document.querySelector('.share');
        $shareElement.classList.toggle('hidden');
    })

    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
            const $shareElement = document.querySelector('.share');
            $shareElement.classList.add('hidden');
        }
    })
}

function init() {
    showShareView()
    closeShareView()
}

init()