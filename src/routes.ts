import { Request, Response, Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();
const userController = new UserController();

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);
router.delete('/user/:email', userController.deleteUser);

export { router };
