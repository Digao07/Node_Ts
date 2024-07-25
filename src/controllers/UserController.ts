import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const { name, email } = request.body;

        if (!name) {
            return response.status(400).json({ message: 'Bad request! Name is required' });
        }

        if (!email) {
            return response.status(400).json({ message: 'Bad request! Email is required' });
        }

        this.userService.createUser(name, email);
        return response.status(201).json({ message: 'User created successfully' });
    };

    getAllUsers = (request: Request, response: Response): Response => {
        const users = this.userService.getAllUsers();
        return response.status(200).json(users);
    };

    deleteUser = (request: Request, response: Response): Response => {
        const { email } = request.params;

        const userDeleted = this.userService.deleteUser(email);
        
        if (!userDeleted) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ message: 'User deleted successfully' });
    };
}
