import dotenv from "dotenv"
import express from "express"
import { Server } from 'socket.io';
import { createServer } from 'http';
import mongoose from "mongoose";
import user from "./routes/user.js"
import cookieParser from "cookie-parser";
import messages from "./routes/messages.js"


dotenv.config()
const PORT = process.env.PORT || 5050
const app = express(); 
const server = createServer(app); 
const io = new Server(server);


app.use(express.json())
app.use(cookieParser())
app.use("/api/", user)
app.use("/api/", messages)


io.on("connection", socket => { 
	socket.on('join-room', room => {
		socket.join(room)
	})
	socket.on("new-message", (room, message) => {
		console.log(message)
		socket.broadcast.to(room).emit("new-message", message)
	})
		
});
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, (err) => {
	if(!err) console.log('Mongo connected')
	else console.log(err)
})

server.listen(PORT, () => {
	console.log('server is running')
});