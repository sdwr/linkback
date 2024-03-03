import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserAction extends BaseModel {
  @column({ isPrimary: true })
  declare userActionId: number

  @column()
  declare userId: number

  @column()
  declare actionType: string

  @column()
  declare itemId: number

  @column()
  declare date: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
