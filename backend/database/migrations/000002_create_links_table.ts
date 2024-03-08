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

      //create materialized view for vote_sum
      this.schema.raw(`
        CREATE MATERIALIZED VIEW link_s_with_vote_sum AS
        SELECT
          l.id AS link_id,
          COALESCE(SUM(v.vote_value), 0) AS vote_sum
        FROM links l
        LEFT JOIN votes v ON l.id = v.link_id
        GROUP BY l.id;
      `)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
