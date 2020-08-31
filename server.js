//importing an http package (old school way)
const http = require('http');
const app = require('./app');
//then, assign a port where the project should run
// if env variable is not set we will use port 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
