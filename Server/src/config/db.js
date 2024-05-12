import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "student",
  password: "1234",
  port: 5432,
});

export default pool;
