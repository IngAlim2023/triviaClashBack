import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

type RoomInfo = {
  room: string
  questions?: string[]
}

let onlineGamer: { name: string }[] = []
let avaibleRooms: { code: string }[] = []
let roomsInfo:RoomInfo[] = []

app.ready(() => {
  const io = new Server(server.getNodeServer(), { cors: { origin: '*' } })

  io.on('connection', (socket) => {
    socket.emit('newUser', onlineGamer)
    socket.emit('newRoom', avaibleRooms)
    socket.emit('rooms', roomsInfo)

    socket.on('newUser', (username: string) => {
      const name = String(username).trim()
      if (!onlineGamer.find((u) => u.name.toLowerCase() === name.toLowerCase())) {
        onlineGamer.push({ name })
      }
      io.emit('newUser', onlineGamer)
    })

    socket.on('newRoom', (codeRoom: string) => {
      const code = String(codeRoom)
      if (!avaibleRooms.find((r) => r.code === code)) {
        avaibleRooms.push({ code })
      }
      io.emit('newRoom', avaibleRooms)
    })

    socket.on('rooms', (infoRoom) => {
      const index = roomsInfo.findIndex((r) => r.room === infoRoom.room)
      if (index !== -1) {
        roomsInfo[index] = infoRoom
      } else {
        roomsInfo.push(infoRoom)
      }

      io.emit('rooms', roomsInfo)
    })
    socket.on('room:getQuestions', ({ room }, ack) => {
      const r = roomsInfo.find((r) => r.room === room)
      if (!r) return ack({ ok: false, error: 'ROOM_NOT_FOUND' })
      ack({ ok: true, questions: r.questions })
    })

    socket.on('disconnect', () => {})
  })
})
