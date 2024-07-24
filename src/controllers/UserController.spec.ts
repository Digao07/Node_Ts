import { UserService } from "../services/UserService";
import { UserController } from "./UserController"
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([]),
        deleteUser: jest.fn()
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
        
        // Simular que o usuário foi encontrado e deletado com sucesso
        mockUserService.deleteUser = jest.fn().mockReturnValue(true);

        userController.deleteUser(mockRequest.params.email, mockResponse)
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
        
        // Simular que o usuário não foi encontrado
        mockUserService.deleteUser = jest.fn().mockReturnValue(false);

        userController.deleteUser(mockRequest.params.email, mockResponse)
        expect(mockResponse.state.status).toBe(404)
        expect(mockResponse.state.json).toMatchObject({ message: 'User not found' })
    })
})
