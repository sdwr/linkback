import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SavedLink extends BaseModel {
  @column({ isPrimary: true })
  declare savedLinkId: number

  @column()
  declare userId: number

  @column()
  declare linkId: number

  @column()
  declare date: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
