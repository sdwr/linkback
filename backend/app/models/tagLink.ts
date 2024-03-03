import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TagLink extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare linkId: number

  @column()
  declare tagId: number

  @column()
  declare userId: number | null

  @column()
  declare date: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
