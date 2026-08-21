import { io } from "../server.js";

io.on('connection', (socket) => {
    console.log(`User is connecting: ${socket.id}`)

    socket.on('join-room', (roomId) => {
        socket.join(roomId)
    })

    socket.on('chat', ({roomId, msg}) => {
        io.to(roomId).emit('receive-msg', {msg, senderId: socket.id})
    })
})