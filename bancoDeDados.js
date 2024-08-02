const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "usuarios",
  password: "120506",
  port: 5432,
});

module.exports = pool;
