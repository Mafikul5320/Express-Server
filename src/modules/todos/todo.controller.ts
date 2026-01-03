import { Request, Response } from "express";
import { todoService } from "./todo.service";

const CreateTodo = async (req: Request, res: Response) => {
    const { user_id, title, description } = req.body;

    try {
        const result = await todoService.createTodo(user_id, title, description)
        // result.
        res.send(result)
    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
};


export const todoController = {
    CreateTodo
}