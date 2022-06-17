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

export {
    findAll,
    findById,
    create
}