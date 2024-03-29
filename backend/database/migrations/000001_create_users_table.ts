import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username').unique()
      table.string('email', 255).unique()
      table.string('password')
      table.boolean('verified_email').notNullable().defaultTo(false)
      table.boolean('is_guest').notNullable().defaultTo(false)

      table.timestamp('date').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
