import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import Todo from './Todo'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public userid: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @hasMany(() => Todo, {
    foreignKey: 'userid'
  })
  public todos: HasMany<typeof Todo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
