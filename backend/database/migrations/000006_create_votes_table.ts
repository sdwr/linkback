import { BaseSchema } from '@adonisjs/lucid/schema'

export default class VotesSchema extends BaseSchema {
  protected tableName = 'votes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('link_id').unsigned().references('id').inTable('links').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('vote_value').notNullable()

      table.timestamp('date').notNullable()
      table.timestamps(true)
      
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
