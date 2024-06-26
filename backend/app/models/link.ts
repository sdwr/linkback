import { DateTime } from 'luxon'
import type { BelongsTo, ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, manyToMany, hasMany  } from '@adonisjs/lucid/orm'

import User from '#models/user'
import Tag from '#models/tag'
import PageView from '#models/pageView'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string

  @column()
  declare domain: string | null

  @column()
  declare contentId: string | null

  @column()
  declare startTime: number | null

  @column()
  declare endTime: number | null

  @column()
  declare duration: number | null

  @column()
  declare isClip: boolean

  @column()
  declare loopClip: boolean

  @column()
  declare embeddable: boolean

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare date: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Tag, {
    pivotTable: 'tag_links'
  })
  declare tags: ManyToMany<typeof Tag>

  @column()
  declare originalLinkId: number | null

  @column()
  declare voteSum: number

  @column()
  declare totalViews: number

  @hasMany(() => PageView)
  declare pageViews: HasMany<typeof PageView>

  @column.dateTime({ autoCreate: true, autoUpdate: false })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
