import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.loginUser(email, password);
        res.send(result)
    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }

};

export const authController = {
    loginUser
}
