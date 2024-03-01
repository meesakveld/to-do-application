const tableName = "todos";

const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex(tableName).del();
	await knex(tableName).insert([
		{
			title: "Complete homework assignment",
			category_id: 2,
		},
		{
			title: "Buy groceries",
			category_id: 1,
		},
		{
			title: "Go to the gym",
			category_id: 1,
		},
		{
			title: "Read a book",
		},
		{
			title: "Prepare for presentation",
			category_id: 2,
		},
		{
			title: "Call Mom",
		},
		{
			title: "Study for exam",
			category_id: 2,
		},
		{
			title: "Clean the house",
		},
		{
			title: "Attend online meeting",
		},
		{
			title: "Start a new project in the park",
			category_id: 1,
		}
	]);
};

export { seed };