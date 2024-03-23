import QRCode from 'qrcode';

export default async function generateQrCodeForTodos(todos) {
    const todosChecked = todos.filter(todo => todo.is_completed);
    const todosUnchecked = todos.filter(todo => !todo.is_completed);

    // Add a line break between checked and unchecked todos and add a title
    let list = []
    list.unshift("Just Do It!");
    list.push("\n");
    if (todosUnchecked.length > 0) {
        list.push("Unchecked todos:")
        list.push(...todosUnchecked.map(todo => `- ${todo.title}${todo.category ? ` | ${todo.category.name}` : ''}`));
        list.push("\n");
    }
    if (todosChecked.length > 0) {
        list.push("Checked todos:");
        list.push(...todosChecked.map(todo => `- ${todo.title}${todo.category ? ` | ${todo.category.name}` : ''}`));
    }

    const options = {
        type: 'image/png',
        quality: 0.92,
        margin: 1,
        color: {
            dark: '#6438c6',
            light: '#ffffff'
        }
    };

    try {
        const url = await QRCode.toDataURL(list.join("\n"), options);
        return url;
    } catch (error) {
        console.error(error);
        return null;
    }

}