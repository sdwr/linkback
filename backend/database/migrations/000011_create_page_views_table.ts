import { BaseSchema } from '@adonisjs/lucid/schema'

export default class VotesSchema extends BaseSchema {
  protected tableName = 'page_views'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      //generic id, cannot reference table as it could be any type of item
      table.integer('item_id').unsigned().notNullable()
      table.string('item_type').notNullable()
      
      table.unique(['user_id', 'item_id', 'item_type'])

      table.timestamp('date').notNullable()
      table.timestamps(true)
      
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
