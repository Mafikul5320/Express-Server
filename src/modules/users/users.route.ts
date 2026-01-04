import express, { Request, Response } from 'express';
import { pool } from '../../config/DB';
import { userController } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();


router.post("/", userController.createUser);

router.get("/", auth("user"), userController.userGet);

router.get("/:id", userController.singleUser)

export const userRoutes = router; 