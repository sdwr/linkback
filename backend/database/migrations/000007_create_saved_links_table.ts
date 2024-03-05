import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SavedLinksSchema extends BaseSchema {
  protected tableName = 'saved_links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('link_id').unsigned().references('id').inTable('links').onDelete('CASCADE')

      table.timestamp('date').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
