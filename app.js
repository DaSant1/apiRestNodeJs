require('dotenv').config();
const server= require('./models/server');
const Server= new server();
Server.listen();