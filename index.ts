import { createServer } from 'http';
import { config } from 'dotenv'

const message = "Hello World!";
config();
createServer(function (request, response) {

  console.log(message);
  response.end(message);

}).listen(3000,  () => {
  console.log("Сервер начал прослушивание порта " + 3000);
});