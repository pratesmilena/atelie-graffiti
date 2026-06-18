import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connection = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432 // Porta padrão do Postgres/pgAdmin
});

connection.connect(err =>{

    if (err){
        console.error('Erro ao conectar ao PgAdmin:', err);
    }else{
        console.log('Conectado ao PgAdmin com sucesso!');
    }
});


export default connection;