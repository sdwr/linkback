import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CommentsSchema extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('content').notNullable()
      table.integer('link_id').unsigned().references('id').inTable('links').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('date', { useTz: true }).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
