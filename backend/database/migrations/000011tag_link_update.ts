import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tag_links'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.integer('vote_sum').defaultTo(0)
    })
  }

  async down() {
  //do nothing
  }
}