import { server } from "./server";
import { config } from 'dotenv';

config();

const PORT: number = parseInt(process.env.PORT as string) || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));