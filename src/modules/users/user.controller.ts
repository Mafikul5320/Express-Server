import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body)
    try {

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
};
const userGet = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUser();
        res.send(result.rows);
        console.log(result.rows)

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
};
const singleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.singleUser(id as string)
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
}


export const userController = {
    createUser,
    userGet,
    singleUser
}