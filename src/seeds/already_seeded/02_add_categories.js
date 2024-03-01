const tableName = "categories";
 
const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      name: "General"
    },
    {
      name: "Outside"
    },
    {
      name: "School"
    }
  ]);
};
 
export { seed };