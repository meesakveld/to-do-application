
/**
 * The function filters unique categories from a list of todos and adds 'All' as the first category.
 * @param todosData - An array of objects where each object represents a todo item. Each todo item has
 * a `category` property indicating the category it belongs to.
 * @returns an array of unique categories extracted from the `todosData` array. The array is sorted in
 * alphabetical order and includes the string 'All' at the beginning.
 */
export function handleCategories(categoriesData) {
    const categories = [...categoriesData].map(category => category.name)
    categories.sort();
    categories.unshift('All');
    return categories;
}

