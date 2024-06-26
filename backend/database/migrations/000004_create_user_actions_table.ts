import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserActionsSchema extends BaseSchema {
  protected tableName = 'user_actions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('action_type').notNullable()
      table.integer('item_id').notNullable()
      // need to implement this still, blank for now
      table.string('item_type')
      
      table.timestamp('date', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
