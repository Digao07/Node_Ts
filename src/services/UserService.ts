export interface User {
    name: string
    email: string
}

const db: User[] = [
    {
        name: "Renato",
        email: "renato@hotmail.com",
    }
]

export class UserService {
    db: { name: string; email: string }[] = [];

    createUser(name: string, email: string): void {
        this.db.push({ name, email });
    }

    getAllUsers(): { name: string; email: string }[] {
        return this.db;
    }

    deleteUser(email: string): boolean {
        const userIndex = this.db.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.db.splice(userIndex, 1);
            return true;
        }
        return false;
    }
}
