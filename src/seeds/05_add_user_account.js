const tableName = "users"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'hello@example.com',
      password: '$2b$10$Dz1QP6X2aty4He993qqVjuImsjlCcQbn6LopTlKysJpLF5E8DDxrK',
    }
  ]);
};

export { seed };