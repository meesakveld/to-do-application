const tableName = "todos"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      title: "Buy groceries",
      category_id: 5,
      is_completed: false,
      user_id: 1,
    },
    {
      title: "Do laundry",
      category_id: 4,
      is_completed: false,
      user_id: 1,
    },
    {
      title: "Clean the house",
      category_id: 5,
      is_completed: false,
      user_id: 1,
    },
    {
      title: "Walk the dog",
      is_completed: false,
      user_id: 2,
    },
    {
      title: "Go to the gym",
      category_id: 6,
      is_completed: false,
      user_id: 2,
    },
  ]);
};

export { seed };