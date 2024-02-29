import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TagsSchema extends BaseSchema {
  protected tableName = 'tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable().unique()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('date', { useTz: true }).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
