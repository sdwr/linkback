import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserSessionsSchema extends BaseSchema {
  protected tableName = 'user_sessions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('session_token', 255).notNullable().unique()
      table.string('device_ip', 255).notNullable()

      table.dateTime('date').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
