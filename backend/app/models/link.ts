import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
  declare isClip: boolean

  @column()
  declare loopClip: boolean

  @column()
  declare embeddable: boolean

  @column()
  declare title: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare date: DateTime

  @column()
  declare userId: number

  @column()
  declare originalLinkId: number | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
