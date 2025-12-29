import express, { json, Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Express js , welcome!')
})

const pool = new Pool({
    connectionString: `${process.env.CNT_STD}`
})


const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        age INT CHECK (age>=0),
        phone VARCHAR (15),
        address TEXT,
        create_at TIMESTAMP DEFAULT NOW(),
        update_at TIMESTAMP DEFAULT NOW()
        )
        `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        create_at TIMESTAMP DEFAULT NOW(),
        update_at TIMESTAMP DEFAULT NOW()
        )

        `)
}

initDB();


app.post("/user", async (req: Request, res: Response) => {
    const { name, email, age } = req.body;

    try {
        const result = await pool.query(`INSERT INTO users(name,email, age) VALUES($1, $2, $3) RETURNING *`, [name, email, age]);
        console.log(result.rows[0]);
        res.send({
            message: "Data insert sucessfull",
            sucess: true,
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.send(result.rows);
        console.log(result.rows)

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
})
app.get("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
        if (result.rows.length === 0) {
            res.json({
                message: "user not found"
            })
        } else {
            res.send(result.rows);
            console.log(result.rows)
        }

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
