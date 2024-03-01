const tableName = "todos";
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.integer("category_id")
        table.boolean("is_completed").notNullable().defaultTo(false);
        table.timestamps(true, true);
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}