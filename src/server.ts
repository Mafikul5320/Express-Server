import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import { initDB, pool } from './config/DB';
import { userRoutes } from './modules/users/users.route';
import { TodoRoute } from './modules/todos/todo.route';
import { authRouter } from './modules/auth/auth.route';
const app = express();
app.use(express.json());



initDB();

//! users

app.use("/user", userRoutes)
app.use("/users", userRoutes);
app.get("/users", userRoutes)


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







// todo
app.use("/todo", TodoRoute)

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

// user Auth

app.use("/auth", authRouter)






app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
