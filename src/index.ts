import { createServer } from 'http';
import { config } from 'dotenv';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './userController';

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
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
    const id = req.url?.split('/')[3] as string;
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: 'The requested URL does not exist' }));
  }
});

const PORT: number = parseInt(process.env.PORT as string) || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));