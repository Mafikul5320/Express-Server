import express, { json, Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
const app = express();
app.use(express.json());
dotenv.config()

const port = 3000

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


app.post("/user", (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({
        status: true,
        message: "Api calling..."
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
