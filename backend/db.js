// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // Usuario por defecto...Utilizo postgres v18
  host: 'localhost',       
  database: 'cocteles_db', // ¡El nombre de la base que acabamos de crear!
  password: 'dylan65', 
  port: 5432,              
});

module.exports = pool;