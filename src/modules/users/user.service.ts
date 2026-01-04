import { pool } from "../../config/DB";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, role, age } = payload;
    const hasPassword = await bcrypt.hashSync(password as string, 10)
    const result = await pool.query(`INSERT INTO users(name,email,password,role, age) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hasPassword, role, age]);

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