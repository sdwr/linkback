import { BaseSchema } from '@adonisjs/lucid/schema'

export default class VotesSchema extends BaseSchema {
  protected tableName = 'page_views'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('item_id').unsigned().notNullable()
      table.string('item_type').notNullable()
      table.integer('total_views').defaultTo(0)
      
      table.unique(['item_id', 'item_type'])

      table.timestamp('date').notNullable()
      table.timestamps(true)
      
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
