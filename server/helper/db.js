import pkg from 'pg';
import dotenv from 'dotenv';


const environment = process.env.NODE_ENV || 'development';
dotenv.config();

const {Pool} = pkg;

const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: environment === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    //test the connection

    pool.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            process.exit(1); // Exit the process if unable to connect
        } else {
            console.log('Database connected successfully');
        }
    });



    return pool;
};



const pool = openDb();
export {pool};