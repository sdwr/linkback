import { BaseSchema } from '@adonisjs/lucid/schema'

export default class LinksSchema extends BaseSchema {
  protected tableName = 'links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('url', 2048).notNullable()
      table.string('domain', 255).nullable()
      table.string('content_id', 255).nullable()
      table.integer('start_time').nullable()
      table.integer('end_time').nullable()
      table.boolean('is_clip').defaultTo(false)
      table.boolean('loop_clip').defaultTo(false)
      table.boolean('embeddable').defaultTo(false)
      table.text('title').nullable()
      table.text('description').nullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('original_link_id').unsigned().nullable().references('id').inTable('links')

      table.timestamp('date').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
