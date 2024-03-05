const tableName = "todos"; //! Change TABLENAME to the name of the table you want to create

// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.alterTable(tableName, function (table) {
        table.integer('category_id').unsigned().alter();
    });
}

// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.alterTable(tableName, function (table) {
        table.integer('category_id').alter();
    });
}