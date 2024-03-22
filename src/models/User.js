import knex from "../lib/Knex.js";
import { Model } from "objection";
import Todo from "./Todo.js";

// instantiate the model
Model.knex(knex);

// define the model
class User extends Model { //! Change the name of the class to the name of the table you want to link
    static get tableName() {
        return "users"; //! Change the name of the table you want to link
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() { //! Update the jsonSchema to match the table you want to link
        return {
            type: "object",
            required: ["email", "password", "firstname", "lastname"],
            properties: {
                id: { type: "integer" },
                email: { type: "string", minLength: 1, maxLength: 255 },
                password: { type: "string", minLength: 1, maxLength: 255 },
                firstname: { type: "string", minLength: 1, maxLength: 255 },
                lastname: { type: "string", minLength: 1, maxLength: 255 },
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
                    from: "users.id",
                    to: "todos.user_id"
                }
            },
            categories: {
                relation: Model.HasManyRelation,
                modelClass: Category,
                join: {
                    from: "users.id",
                    to: "categories.user_id"
                }
            }
        }
    }
}

export default Category; //! Change the name of the class to the name of the table you want to link