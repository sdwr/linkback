import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TagLinksSchema extends BaseSchema {
  protected tableName = 'tag_links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE')
      table.integer('link_id').unsigned().references('id').inTable('links').onDelete('CASCADE')

      table.timestamp('date', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
