import server from './server/index.js';
import 'dotenv/config';

const host = process.env.HOST;
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
