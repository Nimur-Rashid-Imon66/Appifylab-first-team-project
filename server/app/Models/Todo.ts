import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public userid: number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public priority: string;

  @column()
  public tags: string;

  @belongsTo(() => User,{
    foreignKey:'userid'
  })
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
