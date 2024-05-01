import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password213',
  database: 'budget_app_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connection;