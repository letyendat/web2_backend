import app from "./app.js";
import * as socketio from 'socket.io';
import * as http from 'http';
// import express from 'express';

import answer from "./src/socket/answer.js";

const PORT = process.env.PORT || 3000;


var server = http.createServer(app);
const io = new socketio.Server(server,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

answer(io);

server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

// export default io;
