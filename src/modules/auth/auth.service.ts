import { pool } from "../../config/DB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";


const loginUser = async (email: string, password: string) => {

    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (result.rows.length === 0) {
        return null;
    };
    const user = result.rows[0];
    console.log(user)

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return false
    }

    const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, config.secret_key as string, {
        expiresIn: "1d"
    });

    console.log(token);

    return {
        user, token
    }

};

export const authService = {
    loginUser,
}