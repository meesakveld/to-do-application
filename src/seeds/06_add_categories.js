const tableName = "categories"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex(tableName).del();
	await knex(tableName).insert([
		{
			name: "Outside",
			user_id: 1,
		},
		{
			name: "Home",
			user_id: 1,
		}
	]);
};

export { seed };