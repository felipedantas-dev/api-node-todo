require('dotenv').config();

const express = require('express');
const server = express();
server.use(express.json());


const AuthRoutes = require('./routes/AuthRoutes');
const AuthValidation = require('./middlewares/AuthValidation');
server.use('/auth', AuthRoutes);

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', AuthValidation, TaskRoutes);


server.listen(3000);