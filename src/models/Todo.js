import knex from "../lib/Knex.js";
import { Model } from "objection";
import Category from "./Category.js";


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
            required: ["title", "is_completed"],
            properties: {
                id: { type: "integer" },
                title: { type: "string", minLength: 1, maxLength: 255 },
                category_id: { type: ["integer", "null"] },
                is_completed: { type: "boolean" },
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
            }
        }
    }
}

export default Todo; //! Change the name of the class to the name of the table you want to link