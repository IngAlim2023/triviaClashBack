import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

let onlineGamer: string[] = []

app.ready(() => {
  const io = new Server(server.getNodeServer(), {
    cors: {
      origin: '*'
    },
  })
  io.on('connection', (socket) => {
    
    socket.on('newUser', (username: string) => {
      console.log(`Nuevo jugador: ${username}`)

      // Guardar en lista (solo si no existe ya)
      if (!onlineGamer.includes(username)) {
        onlineGamer.push(username)
      }

      // Emitir a todos los clientes la lista actualizada
      io.emit('newUser', onlineGamer)
    })
    
    // Detectar desconexión
    socket.on('disconnect', () => {
      console.log('❌ Cliente desconectado:', socket.id)
    })
  })
})