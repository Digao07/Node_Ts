import { UserService } from "../services/UserService";

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    it('Deve adicionar um novo usuário', () => {
        userService.createUser('Rodrigo', 'rodrigo@hotmail.com');
        expect(userService.getAllUsers()).toEqual([{ name: 'Rodrigo', email: 'rodrigo@hotmail.com' }]);
    });

    it('Deve retornar todos os usuários', () => {
        userService.createUser('Rodrigo', 'rodrigo@hotmail.com');
        userService.createUser('Ana', 'ana@gmail.com');
        expect(userService.getAllUsers()).toEqual([
            { name: 'Rodrigo', email: 'rodrigo@hotmail.com' },
            { name: 'Ana', email: 'ana@gmail.com' }
        ]);
    });

    it('Deve deletar um usuário', () => {
        userService.createUser('Rodrigo', 'rodrigo@hotmail.com');
        const result = userService.deleteUser('rodrigo@hotmail.com');
        expect(result).toBe(true);
        expect(userService.getAllUsers()).toEqual([]);
    });

    it('Deve retornar false se o usuário não for encontrado ao deletar', () => {
        const result = userService.deleteUser('inexistente@hotmail.com');
        expect(result).toBe(false);
    });
});
