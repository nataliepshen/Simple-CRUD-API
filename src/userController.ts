import { IncomingMessage, ServerResponse } from 'http';
import * as User from './userModel';
import { IUserWithoutId } from './usersData';
import { getPostData } from './utils';

async function getAllUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
        const allUsers = await User.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(allUsers));
    }catch(error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Something went wrong on the server'}));
    };
};

async function getUserById(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    try {
        const user = await User.findById(res, id);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(user));
    }catch(error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Something went wrong on the server'}));
    };
};

async function createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
        const body = await getPostData(req, res);
        const { username, age, hobbies }: IUserWithoutId = body;
        const user: IUserWithoutId = {
            username,
            age,
            hobbies
        };
        const newUser = await User.create(user);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newUser));
    } catch(error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Something went wrong on the server'}));
    };
};

async function updateUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    try {
        await User.findById(res, id);
        const body = await getPostData(req, res);
        const { username, age, hobbies }: IUserWithoutId = body;
        const userData: IUserWithoutId = {
            username: username,
            age: age,
            hobbies: hobbies
        };
        const updUser = await User.update(id, userData);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(updUser));
    }catch(error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Something went wrong on the server'}));
    };
};

async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    try {
        await User.findById(res, id);
        await User.remove(id);
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: `User ${id} removed` }));
    }catch(error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Something went wrong on the server'}));
    };
};


export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};