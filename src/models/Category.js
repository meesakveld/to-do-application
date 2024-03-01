import knex from "../lib/Knex.js";
import { Model } from "objection";

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
            required: ["name"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 255 },
                created_at: { type: "string" },
                updated_at: { type: "string" }
            },
        };
    }
}

export default Category; //! Change the name of the class to the name of the table you want to link