import { pool } from "../../config/DB";

const createUser = async (name: string, email: string, age: number) => {
    const result = await pool.query(`INSERT INTO users(name,email, age) VALUES($1, $2, $3) RETURNING *`, [name, email, age]);

    return result;
};

const getUser = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
};

const singleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result;
}

export const userService = {
    createUser,
    getUser,
    singleUser
}