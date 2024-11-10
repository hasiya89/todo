import { pool } from "../helper/db.js";

const insertUser = async (email, hashedPassword) => {
    return await pool.query('insert into users (email, password) values ($1, $2) returning *', [email, hashedPassword]);
};

const selectUserByEmail = async (email) => {
    return await pool.query('select * from users where email = $1', [email]);
};

export { insertUser, selectUserByEmail };