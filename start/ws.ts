import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

let onlineGamer: { name: string }[] = []
let avaibleRooms: { code: string }[] = []

app.ready(() => {
  const io = new Server(server.getNodeServer(), {
    cors: {
      origin: '*',
    },
  })
  io.on('connection', (socket) => {
    socket.on('newUser', (username: string) => {
      console.log(`Nuevo jugador: ${username}`)

      // Guardar en lista (solo si no existe ya)
      if (!onlineGamer.find((u) => u.name === username)) {
        onlineGamer.push({ name: username })
      }

      // Emitir a todos los clientes la lista actualizada
      io.emit('newUser', onlineGamer)
    })
    socket.on('newRoom', (codeRoom: string) => {
      console.log(`Nueva Room: ${codeRoom}`)

      // Guardar en lista (solo si no existe ya)
      if (!avaibleRooms.find((u) => u.code === codeRoom)) {
        avaibleRooms.push({ code: codeRoom })
      }

      // Emitir a todos los clientes la lista actualizada
      io.emit('newRoom', avaibleRooms)
    })

    // Detectar desconexión
    socket.on('disconnect', () => {
      console.log('❌ Cliente desconectado:', socket.id)
    })
  })
})
