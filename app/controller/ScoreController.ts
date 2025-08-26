import ScoreServices from '#services/ScoreServices'
import { HttpContext } from '@adonisjs/core/http'

const sco = new ScoreServices()

export default class ScoreController {
  async createScore({ request, response }: HttpContext) {
    try {
      const { nombre, score, icono } = request.body()
      const nScore = await sco.create({ nombre, score, icono })

      return response.status(201).json({ message: 'Creado', data: nScore })
    } catch (e) {
      return response.status(500).json({ message: 'Error' })
    }
  }
  async readScore({ response }: HttpContext) {
    try {
      const score = await sco.read()
      return response.status(200).json({ message: 'Obtenido', data: score })
    } catch (e) {
      return response.status(500).json({ message: 'Error' })
    }
  }
}
