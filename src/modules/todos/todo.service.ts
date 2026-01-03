import { pool } from "../../config/DB";

const createTodo = async (user_id: number, title: string, description: string) => {
    const result = await pool.query(`INSERT INTO todos(user_id,title,description) VALUES($1, $2, $3) RETURNING *`, [user_id, title, description]);
    return result;
};

export const todoService = {
    createTodo
} 