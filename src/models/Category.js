import knex from "../lib/Knex.js";
import { Model } from "objection";
import Todo from "./Todo.js";
import User from "./User.js";

// instantiate the model
Model.knex(knex);

// define the model
class Category extends Model { //! Change the name of the class to the name of the table you want to link
    static get tableName() {
        return "categories"; //! Change the name of the table you want to link
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() { //! Update the jsonSchema to match the table you want to link
        return {
            type: "object",
            required: ["name", "user_id"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 255 },
                user_id: { type: "integer" },
                created_at: { type: "string" },
                updated_at: { type: "string" }
            },
        };
    }

    static get relationMappings() {
        return {
            todos: {
                relation: Model.HasManyRelation,
                modelClass: Todo,
                join: {
                    from: "categories.id",
                    to: "todos.category_id"
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "categories.user_id",
                    to: "users.id"
                }
            }
        }
    }

}

export default Category; //! Change the name of the class to the name of the table you want to link