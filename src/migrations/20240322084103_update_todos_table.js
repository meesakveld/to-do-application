const tableName = "todos"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.table(tableName, function (table) {
        // Add user_id to table that is linked to users table
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("id").inTable("users");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.table(tableName, function (table) {
        table.dropColumn("user_id");
    });
}