import { createServer } from "http";
import app from "./app.js";
import 'dotenv/config'
import { Server } from "socket.io";
import { saveNewMessages } from "./controller/message.controller.js";

const PORT = process.env.PORT || 4001

const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: 'https://chat-app-two-ochre-87.vercel.app',
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log(`User is connecting: ${socket.id}`)

    socket.on('join-room', (roomId) => {
        console.log(roomId)
        socket.join(roomId)
    })

    socket.on('chat', async ({roomId, msg, receiverId, senderId}) => {
        console.log('msg is send')
        io.to(roomId).emit('receive-msg', {
            content: msg,
            senderId, 
            receiverId
        })
        const message = await saveNewMessages({
            content: msg,
            senderId,
            receiverId
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
})