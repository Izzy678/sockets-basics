import express, { Express, Request, Response } from "express";
import socket, { Server, Socket } from "socket.io";

const port = 8000;

const app: Express = express();

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO FROM EXPRESS + TS!!!!");
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("BYEEE!!");
});

const expressServer = app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

const io = new Server(expressServer, {});
//on is a regular javascript / node event listener
io.on("connection", (socket) => {
  console.log("user socket Id", socket.id);
  /* 
   1st arg of the emit method is the event name
   emit pushes an event to the server.
  */
  socket.emit("welcome", [1, 2, 3]);
  socket.on("thankYou", (data) => {
    console.log("message from client",data);
  });
  socket.on('messageFromClientToServer',(newMessage)=>{
    io.emit('messageToClient',newMessage)
  })
});
