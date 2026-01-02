import express, { Request, Response } from 'express';
import config from './config';
import { initDB, pool } from './config/DB';
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Express js , welcome!')
});


initDB();


// todo
app.post("/todo", async (req: Request, res: Response) => {
    const { user_id, title, description } = req.body;

    try {
        const result = await pool.query(`INSERT INTO todos(user_id,title,description) VALUES($1, $2, $3) RETURNING *`, [user_id, title, description]);
        // result.
        res.send(result)
    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
});

app.put("/update/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(title, description, id)

    try {
        const result = await pool.query(`UPDATE todos SET title=$1, description=$2 WHERE id=$3`, [title, description, id]);
        res.status(201).send({
            message: "update sucessfully",
            sucess: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
});


app.delete("/delete/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
        res.status(200).send({
            sucess: true,
            message: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
})




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

app.put("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query(`UPDATE users SET name=$1 , email=$2 WHERE id=$3`, [name, email, id]);
        if (result.rows.length === 0) {
            res.json({
                message: "user not found"
            })
        } else {
            res.send({
                message: "update sucessfull",
                result: result.rows
            });
            console.log(result.rows)
        }

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
})
app.delete("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
        if (result.rows.length === 0) {
            res.json({
                message: "user not found"
            })
        } else {
            res.send({
                message: "update sucessfull",
                result: result.rows
            });
            console.log(result.rows)
        }

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
});




app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
