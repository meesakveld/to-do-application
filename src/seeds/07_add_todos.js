const tableName = "todos"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex(tableName).del();
	await knex(tableName).insert([
		{
			title: "Buy groceries",
			category_id: 1,
			user_id: 1,
			is_completed: 0,
		},
		{
			title: "Clean the house",
			category_id: 2,
			user_id: 1,
			is_completed: 0,
		},
		{
			title: "Go for a run",
			category_id: 1,
			user_id: 1,
			is_completed: 1,
		},
		{
			title: "Finish the project",
			category_id: 2,
			user_id: 1,
			is_completed: 0,
		},
		{
			title: "Call mom",
			category_id: 2,
			user_id: 1,
			is_completed: 1,
			is_completed: 0,
		},
		{
			title: "Read a book",
			category_id: 2,
			user_id: 1,
			is_completed: 0,
		},
	]);
};

export { seed };