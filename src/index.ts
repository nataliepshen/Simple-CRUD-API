import { createServer } from 'http';
import { config } from 'dotenv';
import { getAllUsers, getUserById, createUser, updateUser } from './userController';

config();

const server = createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res);
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id = req.url?.split('/')[3] as string;
    getUserById(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
    const id = req.url?.split('/')[3] as string;
    updateUser(req, res, id);
  } 
});

const PORT: number = parseInt(process.env.PORT as string) || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));