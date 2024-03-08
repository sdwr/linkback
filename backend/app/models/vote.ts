// app/Models/User.ts

import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare linkId: number

  @column()
  declare userId: number

  @column()
  declare voteValue: number
  
  @column()
  declare date: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
