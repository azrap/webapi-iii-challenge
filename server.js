const express = require('express');

const server = express();

const userRouter = require('./users/userRouter.js');

server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

server.use('/api/users', userRouter);

module.exports = server;



