import express, { Request, Response } from 'express';
import { pool } from '../../config/DB';
import { userController } from './user.controller';

const router = express.Router();


router.post("/", userController.createUser);

router.get("/", userController.userGet);

router.get("/:id", userController.singleUser)

export const userRoutes = router; 