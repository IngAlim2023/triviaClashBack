import { BaseModel, column } from '@adonisjs/lucid/orm'
import { type Icono } from '../interfaces/score.js'

export default class Score extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() declare nombre: string
  @column() declare score: number
  @column() declare icono: Icono
}