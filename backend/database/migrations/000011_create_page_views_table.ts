import { BaseSchema } from '@adonisjs/lucid/schema'

export default class VotesSchema extends BaseSchema {
  protected tableName = 'page_views'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_session_id').unsigned().notNullable().references('id').inTable('user_sessions').onDelete('CASCADE')
      table.integer('link_id').unsigned().notNullable().references('id').inTable('links').onDelete('CASCADE')
      
      table.unique(['user_session_id', 'link_id'])

      table.timestamp('date').notNullable()
      table.timestamps(true)
      
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
