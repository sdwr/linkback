import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TagLinksSchema extends BaseSchema {
  protected tableName = 'tag_links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      
      table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE')
      table.integer('link_id').unsigned().references('id').inTable('links').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      //NOTE- NOT ADDED AT TIME OF MIGRATION, NOT ON OTHER TABLES EITHER
      table.unique(['tag_id', 'link_id', 'user_id'])
      
      table.integer('vote_sum').defaultTo(0)

      table.timestamp('date').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
