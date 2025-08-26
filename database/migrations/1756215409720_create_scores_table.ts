import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'scores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 50)
      table.integer('score', 10)

      table.enum('icono',["gryphon","chimera","echidna","madre-monte","scarecrow","summoner","dragon-2","Basilisk","bat"])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}