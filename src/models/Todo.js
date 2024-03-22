import knex from "../lib/Knex.js";
import { Model } from "objection";
import Category from "./Category.js";
import User from "./User.js";


// instantiate the model
Model.knex(knex);

// define the model
class Todo extends Model { //! Change the name of the class to the name of the table you want to link
    static get tableName() {
        return "todos"; //! Change the name of the table you want to link
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() { //! Update the jsonSchema to match the table you want to link
        return {
            type: "object",
            required: ["title", "is_completed", "user_id"],
            properties: {
                id: { type: "integer" },
                title: { type: "string", minLength: 1, maxLength: 255 },
                is_completed: { type: "boolean" },
                category_id: { type: ["integer", "null"] },
                user_id: { type: "integer" },
                created_at: { type: "string" },
                updated_at: { type: "string" }
            },
        };
    }

    static get relationMappings() {
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: "todos.category_id",
                    to: "categories.id"
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "todos.user_id",
                    to: "users.id"
                }
            }
        }
    }
}

export default Todo; //! Change the name of the class to the name of the table you want to link