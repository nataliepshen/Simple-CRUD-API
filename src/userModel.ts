import { IUser, IUserWithoutId } from './usersData';
import { v4 as uuidv4, validate } from 'uuid';
import { ServerResponse } from 'http';

export let users: IUser[] = [];

function findAll(): Promise<IUser[]> {
    return new Promise ((resolve, reject) => {
        resolve(users);
    });
};

function findById(res: ServerResponse, id: string): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.id === id);
        if (id && !validate(id)) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Invalid user id' }));
        } else if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'User Not Found' }));
        }
        resolve(user);
    });
};

function create(user: IUserWithoutId): Promise<IUser> {
    return new Promise((resolve, reject) => {
        const newUser = { id: uuidv4(), ...user };
        users.push(newUser);
        resolve(newUser);
    });
};

function update(id: string, user: IUserWithoutId): Promise<IUser> {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((u) => u.id === id);
        users[index] = {id, ...user};
        resolve(users[index]);
    });
};

function remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        users = users.filter((u) => u.id !== id);
        resolve();
    });
};

export {
    findAll,
    findById,
    create,
    update,
    remove
};