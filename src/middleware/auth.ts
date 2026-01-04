import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(504).json({
                    messagae: "Unauthorized ...."
                })
            };
            const decord = jwt.verify(token!, config.secret_key as string) as JwtPayload;
            console.log(decord);
            req.user = decord;
            console.log("length: ", role.length);
            if (role.length && !role.includes(decord.role)) {
                return res.status(500).json({
                    sucess: false,
                    error: "Unauthorized...",
                })
            }
            next()

        } catch (err: any) {
            res.status(500).json({
                sucess: false,
                error: err.message,
            })
        }

    }
};

export default auth;