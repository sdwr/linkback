import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SavedLinksSchema extends BaseSchema {
  protected tableName = 'saved_links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('savedLinkId')
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('linkId').unsigned().references('id').inTable('links').onDelete('CASCADE')
      table.timestamp('date', { useTz: true }).defaultTo(this.now())
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
