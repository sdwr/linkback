import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

//unused, will delete later
export default class UserSession extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare sessionToken: string

  @column()
  declare deviceIP: string

  @column()
  declare date: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}