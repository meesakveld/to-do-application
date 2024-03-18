import { NODE_ENV } from "../consts.js";

import knex from "knex";
import knexConfig from "../../knexfile.js";

// get the environment from the .env file
const environment = NODE_ENV || "development";

// get the configuration for the environment
const config = knexConfig[environment];

// create the connection 
const Knex = knex(config); 

// export the connection
export default Knex;