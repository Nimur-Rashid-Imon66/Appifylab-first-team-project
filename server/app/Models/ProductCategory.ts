import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public categoryid: number
  
  @column()
  public userid: number
  
  @column()
  public categoryname: string
  
  @column()
  public categorydescription :string|null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,
    {
      foreignKey: 'userid'
  })
  public user: BelongsTo<typeof User>

}
