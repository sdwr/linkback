import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PageView extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userSessionId: number

  @column()
  declare linkId: number

  @column()
  declare date: string

  @column.dateTime({ autoCreate: true, autoUpdate: false })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
