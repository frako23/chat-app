import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST']
  }
})

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

const userSocketMap = {} // {userId: socketId}

io.on('connection', (socket) => {
  console.log('a user has connected', socket.id)

  const userId = socket.handshake.query.userId
  if (userId !== 'undefined') userSocketMap[userId] = socket.id

  // io.emit() is used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  // socket.on() is used to listen to the events. Can be both on client and server side
  socket.on('disconected', () => {
    console.log('user has disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, server }
