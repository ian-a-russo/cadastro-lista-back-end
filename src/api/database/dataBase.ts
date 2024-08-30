import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "usuarios",
  password: "120506",
  port: 5432,
});
