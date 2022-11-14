const { Pool } = require("pg");
require("dotenv").config();
const config = {
  user: "mjt",
  host: "localhost",
  password: "mjt",
  port: 5432,
  database: "appunto",
  max: 20,
};
const pool = new Pool(config);
module.exports = {
  pool,
};
