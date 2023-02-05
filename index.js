import dotenv from "dotenv"
import express from "express"
import { Server } from 'socket.io';
import { createServer } from 'http';
import mongoose from "mongoose";
import user from "./routes/user.js"
import cookieParser from "cookie-parser";
import messages from "./routes/messages.js"
import cors from "cors"
import rateLimit from "express-rate-limit"
import path from "path"
dotenv.config()
const PORT = process.env.PORT || 5050
const app = express(); 
const server = createServer(app); 
const io = new Server(server, {
	cors: "http://localhost:3000/",
	methods: ["GET", "POST"]
});

const limiter = rateLimit({
	windowMs: 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
})
app.use(express.static(path.resolve(process.cwd(), "Client", "build")));
app.use(limiter)
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/", user)
app.use("/api/", messages)

app.get("*", (_, res) => {
	res.sendFile(
		path.join(process.cwd(), "./Client/build/index.html"),
		(err) => {
			if(err) {
				res.status(500).send(err)
			}
		}
	)
})
io.on("connection", socket => { 
	socket.on('join-room', room => {
		socket.join(room)
	})
	socket.on("send-message", (room, message) => {
		socket.to(room).emit("new-message", message)
	})
	socket.on("start-typing", room => {
		socket.to(room).emit("sender-start-typing")
	})
	socket.on("stop-typing", room => {
		socket.to(room).emit("sender-stop-typing")
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