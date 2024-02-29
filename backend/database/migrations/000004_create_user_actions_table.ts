import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserActionsSchema extends BaseSchema {
  protected tableName = 'user_actions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('userActionId')
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('actionType').notNullable()
      table.integer('itemId').notNullable()
      table.timestamp('date', { useTz: true }).defaultTo(this.now())
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
