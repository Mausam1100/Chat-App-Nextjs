import { createServer } from "http";
import app from "./app.js";
import 'dotenv/config'
import { Server } from "socket.io";
import { saveNewMessages } from "./controller/message.controller.js";
import { prisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 4001

const server = createServer(app)
export const io = new Server(server, {
  cors: {
    origin: [
      "https://chat-app-two-ochre-87.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on('connection', (socket) => {

    socket.on('register', (userId) => {
        socket.join(`user_${userId}`)
    })

    socket.on('chat', async ({msg, receiverId, senderId}) => {
        const sender = await prisma.user.findUnique({
            where: {
                id: senderId
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                imageUrl: true
            }
        })

        const payload = {
            content: msg,
            senderId, 
            receiverId,
            sender
        }
        io.to(`user_${receiverId}`).emit('receive-msg', payload)
        io.to(`user_${senderId}`).emit('receive-msg', payload)
        await saveNewMessages({
            content: msg,
            senderId,
            receiverId
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
})