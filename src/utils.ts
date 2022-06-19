import { IncomingMessage, ServerResponse } from "http";
import { IUserWithoutId } from "./usersData";

function getPostData(req: IncomingMessage, res: ServerResponse): Promise<IUserWithoutId> {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const { username, age, hobbies}: IUserWithoutId = JSON.parse(body);
                    if (!username || !age || !hobbies) {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: 'Missing required fields' }));
                    } else {
                        resolve(JSON.parse(body));
                    }
                } catch(error) {
                    if (error instanceof SyntaxError) {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: `Bad request: ${error.message}` }));
                    };
                };
            });
        } catch(error) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Something went wrong on the server'}));
        };
    });
};

export {
    getPostData
};