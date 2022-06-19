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

export {
    IUser,
    IUserWithoutId
}