import { IncomingMessage, ServerResponse } from 'http';
import * as User from './userModel'
import { validate } from 'uuid';
import { IUser, IUserWithoutId } from './usersData';
import { getPostData } from './utils';

async function getAllUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
        const allUsers = await User.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(allUsers));
    }catch(error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Server down'}));
    }
};

async function getUserById(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    try {
        const user = await User.findById(id);
        if (id && !validate(id)) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Invalid id' }));
        } else if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'User Not Found' }));
        } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(user));
        };
    }catch(error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Server down'}));
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
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Missing required fields' }));
    };
};

export {
    getAllUsers,
    getUserById,
    createUser
}