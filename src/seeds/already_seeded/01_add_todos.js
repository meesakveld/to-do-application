const tableName = "todos";

const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex(tableName).del();
	await knex(tableName).insert([
		{
			title: "Complete homework assignment",
			category_id: null,
		},
		{
			title: "Buy groceries",
			category_id: null,
		},
		{
			title: "Go to the gym",
			category_id: 1,
		}
	]);
};

export { seed };