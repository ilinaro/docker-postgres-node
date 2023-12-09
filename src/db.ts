import { Pool } from 'pg';

const pool = new Pool({
  user: "root",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "my_db"
});

export default pool;
