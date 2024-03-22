const tableName = "categories"; //! Change TABLENAME to the name of the table you want to create
 
const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      name: "Werk",
      user_id: 1,
    },
    {
      name: "Thuis",
      user_id: 1,
    },
    {
      name: "School",
      user_id: 2,
    },
  ]);
};
 
export { seed };