import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

let onlineGamer: { name: string }[] = []
let avaibleRooms: { code: string }[] = []

app.ready(() => {
  const io = new Server(server.getNodeServer(), { cors: { origin: '*' } })

  io.on('connection', (socket) => {
    // ⬅️ Enviar estado actual solo al que entra
    socket.emit('newUser', onlineGamer)
    socket.emit('newRoom', avaibleRooms)

    socket.on('newUser', (username: string) => {
      const name = String(username).trim()
      if (!onlineGamer.find((u) => u.name.toLowerCase() === name.toLowerCase())) {
        onlineGamer.push({ name })
      }
      io.emit('newUser', onlineGamer)
    })

    socket.on('newRoom', (codeRoom: string) => {
      const code = String(codeRoom).trim().toUpperCase()
      if (!avaibleRooms.find((r) => r.code === code)) {
        avaibleRooms.push({ code })
      }
      io.emit('newRoom', avaibleRooms)
    })

    socket.on('disconnect', () => {
      console.log('❌ Cliente desconectado:', socket.id)
    })
  })
})

