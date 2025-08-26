import Score from '#models/score'
import { DataScore } from '../interfaces/score.js'

export default class ScoreServices {
  async create(data: DataScore) {
    return await Score.create(data)
  }
  async read() {
    return await Score.query().select('nombre', 'score', 'icono').orderBy('score', 'desc').limit(6)
  }
}
