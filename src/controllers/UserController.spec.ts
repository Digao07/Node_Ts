import { UserService } from "../services/UserService";
import { UserController } from "./UserController"
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([]),
        deleteUser: jest.fn().mockImplementation((email: string) => {
            const userIndex = mockUserService.db?.findIndex(user => user.email === email);
            if (userIndex !== undefined && userIndex !== -1) {
                mockUserService.db?.splice(userIndex, 1);
                return true;
            }
            return false;
        })
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Rodrigo',
                email: 'rodrigo@hotmail.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'User created successfully' })
    })

    it('Deve retornar erro caso não informe o name', () => {
        const mockRequest = {
            body: {
                email: 'rodrigo@hotmail.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name is required' })
    })

    it('Deve chamar a função getAllUsers', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockUserService.getAllUsers).toHaveBeenCalled()
    })

    it('Deve retornar erro caso não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Rodrigo'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email is required' })
    })

    it('Deve deletar um usuário', () => {
        const mockRequest = {
            params: {
                email: 'rodrigo@hotmail.com'
            }
        } as unknown as Request
        const mockResponse = makeMockResponse()
        mockUserService.deleteUser = jest.fn().mockReturnValue(true);
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'User deleted successfully' })
    })

    it('Deve retornar erro caso o usuário não seja encontrado', () => {
        const mockRequest = {
            params: {
                email: 'inexistente@hotmail.com'
            }
        } as unknown as Request
        const mockResponse = makeMockResponse()
        mockUserService.deleteUser = jest.fn().mockReturnValue(false);
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(404)
        expect(mockResponse.state.json).toMatchObject({ message: 'User not found' })
    })
})
