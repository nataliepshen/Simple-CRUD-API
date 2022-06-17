import { v4 as uuidv4 } from 'uuid';

export let users: IUser[] = [];

interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[] | never[];
}

interface IUserWithoutId {
    username: string;
    age: number;
    hobbies: string[] | never[];
}

const userOne: IUser = {
    id: uuidv4(),
    username: 'Vasya',
    age: 30,
    hobbies: []
}

users.push(userOne);

export {
    IUser,
    IUserWithoutId
}