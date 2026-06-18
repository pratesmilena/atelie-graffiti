const { Pool } = require('pg');

const pool = new Pool({
    bd_user: 'postgres',
    DB_host: 'localhost',
    DB_database: 'atelie_graffiti',
    DB_password: '',
    PORT: 5432
});

module.exports = pool;