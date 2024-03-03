import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username').notNullable().unique()
      table.string('email', 255).notNullable().unique()

      table.timestamp('date', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
