import { users, IUser, IUserWithoutId } from './usersData';
import { v4 as uuidv4 } from 'uuid';

function findAll(): Promise<IUser[]> {
    return new Promise ((resolve, reject) => {
        resolve(users);
    });
};

function findById(id: string): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.id === id)
        resolve(user);
    })
}

function create(user: IUserWithoutId): Promise<IUser> {
    return new Promise((resolve, reject) => {
        const newUser = { id: uuidv4(), ...user };
        users.push(newUser);
        resolve(newUser);
    })
}

function update(id: string, user: IUserWithoutId): Promise<IUser> {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((p) => p.id === id);
        users[index] = {id, ...user};
        resolve(users[index]);
    })
}

function remove(id: string, users: IUser[]): Promise<void> {
    return new Promise((resolve, reject) => {
        users = users.filter((p) => p.id !== id);
        resolve();
    })
}

export {
    findAll,
    findById,
    create,
    update,
    remove
}